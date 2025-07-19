import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthService} from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class CanActivateUserGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((response: any) => {
        console.log("Role response:", response); // <–– wichtig
        if (response.role === 'USER' || response.role === 'ADMIN') {
          return true;
        }
        this.authService.clearUser();
        this.router.navigate(['/login']);
        return false;
      }),
    catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
