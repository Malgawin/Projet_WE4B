import { Component, OnInit } from '@angular/core';
import {User} from "../../class/user";
import {Cours} from "../../class/cours";
import {UsersService} from "../../services/users.service";

export interface UserFormData {
  name: string;
  familyName: string;
  email: string;
  ues: Cours[];
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors de la récupération des utilisateurs', err)
    });
  }

  handleUserCreated(data: UserFormData) {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 0;
    this.userService.createUser(newId, data).subscribe({
      error:(err)=>console.error("Erreur de création d'utilisateur", err)
    });
    this.users.push(new User(newId, data.name, data.familyName, data.email));
  }

  handleUserModified(id:number, data: UserFormData){
    this.userService.updateUser(id, data).subscribe({
      error: (err) => console.error("Erreur lors de la modification de l'utilisateur d'id: " + id.toString(), err)
    })
  }

  handleUserDeleted(userId: number){
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")){
      this.userService.deleteUser(userId).subscribe({
        next: () => this.users = this.users.filter(c => c.id !== userId),
        error: (err) => console.error('Erreur lors de la suppression de l\'utilisateur : ' + userId.toString(), err)
      });
    }
  }

}
