import {inject, Injectable} from '@angular/core';
import {API_CONSTANT} from '../constants/api.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  uri= `${API_CONSTANT.apiBase}/users`;
  http = inject(HttpClient);
  private authenticated: boolean;

  constructor() {
    this.authenticated = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(user:User):Observable<any>{
    const uri_local=`${this.uri}/login`;
    console.log(uri_local)
    const credentials = btoa(`${user.nomUser}:${user.pwdUser}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(uri_local, {}, { headers }).pipe(
      tap({
        next: () => {
          this.authenticated = true;
          localStorage.setItem('isLoggedIn', 'true');
        },
        error: () => {
          this.authenticated = false;
          localStorage.removeItem('isLoggedIn');
        }
      })
    );
  }

  logout(): void {
    this.authenticated = false;
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.authenticated;
  }
}
