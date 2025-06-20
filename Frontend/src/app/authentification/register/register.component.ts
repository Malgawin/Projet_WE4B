import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: Auth, private router: Router, private usersService: UsersService ) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  showPassword: boolean = false;
  registerError: string = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  
  onRegisterSubmit() {
  const { email, password } = this.registerForm.value;
  if (email && password) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;

        const userToInsert = {
          id: firebaseUser.uid,
          name: '[default]',
          family_name: '[default]',
          email: firebaseUser.email || 'vide',
          password: '',
          birth_date: '2000-01-01',
          icon: '[default]'
        };

        this.usersService.createUserFromFirebase(userToInsert).subscribe({
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