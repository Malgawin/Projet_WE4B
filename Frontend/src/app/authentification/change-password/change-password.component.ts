import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private auth: Auth, private router: Router) {}

  passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onChangePassword() {
    if (this.passwordForm.invalid) return;

    const email = this.passwordForm.value.email!;

    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        alert('Un email de réinitialisation a été envoyé à ' + email);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert('Erreur : ' + error.message);
      });
  }
}
