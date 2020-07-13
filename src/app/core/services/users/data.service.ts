import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserArray, User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LoginService , Credentials } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions: any;

  constructor(private http: HttpClient,
    private authService: LoginService
    ) {
    const currentUser: Credentials = this.authService.credentials;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${currentUser.jwt}`
      })
    };
  }

  // Get all users
  getUser() {
    return this.http.get<UserArray>(`${environment.serviceUrl}users`, this.httpOptions)
    .pipe(
      map((res: any) => res.users,
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    ));
  }

  // Save user
  saveUser(userItem: User) {
    return this.http.post(`${environment.serviceUrl}users`, userItem, this.httpOptions);
  }
}
