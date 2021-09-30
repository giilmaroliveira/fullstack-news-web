import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../_models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}auth`, JSON.stringify({ email, password }), { headers: { 'content-type': 'application/json' }});
  }
}
