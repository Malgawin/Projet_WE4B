import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: Auth, private router: Router) {}

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
          console.log('User created:', userCredential.user);
          this.router.navigate(['tableau-de-bord']);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
}
