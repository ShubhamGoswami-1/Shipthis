import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const now = new Date();
        if (now < expirationDate) {
          return true;
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    this.router.navigate(['login']);
    return false;
  }
}
