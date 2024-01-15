import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
//observable es utilizado para manejar request asincronos y respuestas
import { EMPTY, Observable } from 'rxjs';
import { News } from '../news-component/news.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsDataServiceService {

  readonly APIUrl="https://localhost:44390/api";
  readonly PhotoUrl="http://localhost:57650/Photos/"
  
  constructor(private http:HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.APIUrl}/News`);
  }

}
