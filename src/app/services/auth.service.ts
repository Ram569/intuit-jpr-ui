import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticatedUser() {
    return this.http.get('/user/isAuthenticated').pipe(
      map(response => {
        return response;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const credentials = { 'username': username, 'password': password };
    this.http.post('/login', new URLSearchParams(credentials), {headers}).pipe(
      map(response => {
        this.router.navigate(['/create']);
      }),
      catchError((err: any) => {
        return throwError(err.message);
      })
    ).subscribe();
  }
}
