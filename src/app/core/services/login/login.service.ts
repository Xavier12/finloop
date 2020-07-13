import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Login } from '../../models/login.model';

export interface Credentials {
  id: string;
  jwt: string;
}
const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private _credentials: Credentials | null;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  login(userCredentials: Login) {
    return this.http.post(`${environment.serviceUrl}login`, userCredentials, this.httpOptions)
    .pipe(
      map((response: any) => {
        if (!response.id && !response.jwt) {
          return undefined;
        }
        this._credentials = {
          id: response && response.id,
          jwt: response && response.jwt,
        };
        this.setCredentials(this._credentials, true);

        if (this._credentials.jwt) {
          return this._credentials;
        } else {
          return undefined;
        }
      })
    );
  }

  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

}
