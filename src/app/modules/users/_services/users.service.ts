import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/_services/auth.service';
import { BaseResponse } from 'src/app/shared/models/base-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = `${environment.urlApi}users`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<BaseResponse<User[]>> {
    return this.http.get<BaseResponse<User[]>>(this.baseUrl);
  }

  delete(id: string): Observable<BaseResponse<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<BaseResponse<any>>(url);
  }

  create(user: User): Observable<BaseResponse<User>> {
    return this.http.post<BaseResponse<User>>(this.baseUrl, JSON.stringify(user));
  }

  getById(id: string): Observable<BaseResponse<User>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BaseResponse<User>>(url);
  }

  update(id: string, user: User): Observable<BaseResponse<User>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<BaseResponse<User>>(url, JSON.stringify(user));
  }
}
