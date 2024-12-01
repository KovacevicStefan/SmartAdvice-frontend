import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  private attemptedRoute: string = '';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.attemptedRoute = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }

  getAttemptedRoute(): string{
    return this.attemptedRoute;
  }
}
