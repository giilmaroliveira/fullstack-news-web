import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response.model';
import { environment } from 'src/environments/environment';
import { News } from '../_models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  urlApi = `${environment.urlApi}news`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<BaseResponse<News[]>> {
    return this.http.get<BaseResponse<News[]>>(this.urlApi);
  }

  getById(id: string): Observable<BaseResponse<News>> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<BaseResponse<News>>(url);
  }

  create(news: News): Observable<News> {
    return this.http.post<News>(this.urlApi, JSON.stringify(news));
  }

  update(id: string, news: News): Observable<News> {
    const url = `${this.urlApi}/${id}`;
    return this.http.put<News>(url, JSON.stringify(news));
  }

  delete(id: string): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<any>(url);
  }
}
