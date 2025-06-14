import { inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  showPassword: boolean = false;
  loginError: string = '';
  constructor(private auth: Auth, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onLoginSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in:', userCredential.user);

      this.router.navigate(['tableau-de-bord']);
    } catch (error: any) {
      alert(error.message || 'Login failed');
    }
  }
}
