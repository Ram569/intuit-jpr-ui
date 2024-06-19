import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {Injectable} from "@angular/core";
import {map, Observable, take} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate():  Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticatedUser().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
