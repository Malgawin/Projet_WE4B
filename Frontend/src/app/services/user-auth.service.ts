import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UsersService } from './users.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User as FirebaseUser } from 'firebase/auth';
import { switchMap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private _roles: string[] = [];
  private _user: any = null;

  setRoles(roles: string[]): void {
    this._roles = roles;
  }

  get roles(): string[] {
    return this._roles;
  }

  hasRole(role: string): boolean {
    return this._roles.includes(role);
  }

  setUser(user: any): void {
    this._user = user;
    if (user.roles) {
      this._roles = user.roles;
    }
  }

  get user(): any {
    return this._user;
  }

  clear(): void {
    this._user = null;
    this._roles = [];
  }


}

