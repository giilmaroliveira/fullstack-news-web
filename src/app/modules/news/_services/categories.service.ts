import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response.model';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  urlApi = `${environment.urlApi}categories`
  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponse<Category[]>> {
    return this.http.get<BaseResponse<Category[]>>(this.urlApi);
  }

  getById(id: string): Observable<BaseResponse<Category>> {
    const url = `${this.urlApi}/${id}`
    return this.http.get<BaseResponse<Category>>(url);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.urlApi, JSON.stringify(category));
  }

  update(id: string, category: Category): Observable<Category> {
    const url = `${this.urlApi}/${id}`
    return this.http.put<Category>(url, JSON.stringify(category));
  }

  delete(id: string): Observable<any> {
    const url = `${this.urlApi}/${id}`
    return this.http.delete<any>(url);
  }
}
