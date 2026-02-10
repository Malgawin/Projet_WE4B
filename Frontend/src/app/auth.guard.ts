import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAuthService } from './services/user-auth.service';
import { UsersService } from './services/users.service';

import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userauthService: UserAuthService, private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiredRoles = route.data['roles'] as string[] | undefined;
    const user = this.userauthService.user;

    if (!user) {
      return of(this.router.createUrlTree(['/login']));
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return of(true); // accessible sans rôles spécifiques
    }

    const userRoles = this.userauthService.roles;

    const hasRole = userRoles.some((role) => requiredRoles.includes(role));

    return of(hasRole ? true : this.router.createUrlTree(['/unauthorized']));
  }

}
