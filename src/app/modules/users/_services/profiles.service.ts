import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response.model';
import { environment } from 'src/environments/environment';
import { Profile } from '../_models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  baseUrl = `${environment.urlApi}profiles`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<BaseResponse<Profile[]>> {
    return this.http.get<BaseResponse<Profile[]>>(this.baseUrl);
  }

  delete(id: string): Observable<BaseResponse<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<BaseResponse<any>>(url);
  }

  create(user: Profile): Observable<BaseResponse<Profile>> {
    return this.http.post<BaseResponse<Profile>>(this.baseUrl, JSON.stringify(user));
  }

  getById(id: string): Observable<BaseResponse<Profile>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BaseResponse<Profile>>(url);
  }

  update(id: string, user: Profile): Observable<BaseResponse<Profile>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<BaseResponse<Profile>>(url, JSON.stringify(user));
  }
}
