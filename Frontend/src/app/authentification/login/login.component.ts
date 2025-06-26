import { inject, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JournalLogsService } from '../../services/journal-logs.service';
import { UsersService } from 'src/app/services/users.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

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
  constructor(
    private auth: Auth, private router: Router,
    private journalLogsService: JournalLogsService,
    private usersService: UsersService,
    private userAuthService: UserAuthService) {}

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
      const firebaseUid = userCredential.user.uid;
      console.log('User logged in:', firebaseUid);

      this.usersService.getUserRoles(firebaseUid).subscribe({
        next: (roles) => {
          console.log('Rôles récupérés :', roles);
          this.userAuthService.setUser({ uid: firebaseUid, roles });
          this.router.navigate(['/tableau-de-bord']);
        },
        error: (err) => {
          console.error('Erreur récupération rôles :', err);
          alert('Erreur lors de la récupération des rôles.');
        }
      });

    } catch (error: any) {
      alert(error.message || 'Échec de la connexion');
    }
  }

}
