import { Component, OnInit } from '@angular/core';
import {User} from "../../class/user";
import {Cours} from "../../class/cours";
import {UsersService} from "../../services/users.service";
import {EnrollmentService} from "../../services/enrollment.service";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";

export interface UserFormData {
  name: string;
  familyName: string;
  email: string;
  roles: number[];
  ues: Cours[];
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UsersService,
    private enrollmentService: EnrollmentService,
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors de la récupération des utilisateurs', err)
    });
  }

  handleUserCreated(data: UserFormData) {
    const randomPassword = this.generatePassword();

    //Create the user in postgres
    this.userService.createUser(0, data).subscribe({
      next: (newUser) => {
        const newId = newUser.id;

        //Create in firebase
        createUserWithEmailAndPassword(this.auth, data.email, randomPassword)
          .then((userCredential) => {
            const firebaseUser = userCredential.user;

            //Update db with firebase id
            this.userService.linkFirebaseUid(newId, firebaseUser.uid).subscribe({
              next: () => {
                console.log(`User ${newId} linked with Firebase UID ${firebaseUser.uid}`);
              },
              error: (err) => console.error("Erreur de liaison Firebase UID:", err)
            });

            //Assign roles
            this.userService.setUserRoles(newId, data.roles).subscribe({
              error: (err) => console.error("Erreur lors de l'attribution des roles", err)
            });

            //Enroll to courses
            data.ues.forEach(ue => {
              this.enrollmentService.enrollUserToCourse(newId, ue.id).subscribe({
                error: (err) => console.error("Erreur inscription UE:", err)
              });
            });

            //Update local list
            this.users.push(new User(newId, data.name, data.familyName, data.email));
          })
          .catch((error) => {
            console.error("Erreur Firebase:", error);
            alert(error.message);
          });
      },
      error: (err) => console.error("Erreur création en BDD:", err)
    });
  }


  handleUserModified(id:number, data: UserFormData){
    this.userService.updateUser(id, data).subscribe({
      error: (err) => console.error("Erreur lors de la modification de l'utilisateur d'id: " + id.toString(), err)
    });

    //Roles
    this.userService.setUserRoles(id, data.roles).subscribe({
      error: (err) => console.error("Erreur lors de la modification des roles", err)
    });

    //TODO : ues
  }

  handleUserDeleted(userId: number){
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")){
      this.userService.deleteUser(userId).subscribe({
        next: () => this.users = this.users.filter(c => c.id !== userId),
        error: (err) => console.error('Erreur lors de la suppression de l\'utilisateur : ' + userId.toString(), err)
      });
    }
  }

  private generatePassword(length = 6) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  onRegisterSubmit(data: UserFormData) {
    const email = data.email;
    const password = this.generatePassword();

    if (email && password) {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const firebaseUser = userCredential.user;

          const userToInsert = {
            id: firebaseUser.uid,
            name: data.name,
            family_name: data.familyName,
            email: firebaseUser.email || 'vide',
            password: '',
            birth_date: '2000-01-01', //TODO birthdate
            icon: '[default]' //TODO
          };

          this.userService.createUserFromFirebase(userToInsert).subscribe({
            next: () => {
              console.log('Utilisateur ajouté à la base de données.');
              this.router.navigate(['tableau-de-bord']);
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout en base de données :', err);
              alert('Erreur lors de l\'ajout dans la base de données.');
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
}
