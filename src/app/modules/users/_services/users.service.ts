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
    const token = this.authService.getToken();
    return this.http.get<BaseResponse<User[]>>(this.baseUrl, { headers: { 'x-access-token': token }});
  }
}
