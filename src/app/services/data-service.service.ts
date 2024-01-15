import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
//observable es utilizado para manejar request asincronos y respuestas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  readonly APIUrl="https://localhost:44390/api";
  readonly PhotoUrl="http://localhost:57650/Photos/"
  
  constructor(private http:HttpClient) { }

  getBookList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Libro')
  }

  getListByFilter(id?: string, nombre?: string): Observable<any[]> {
    // Construye los parámetros de búsqueda
    let params = new HttpParams();
  
    // Agrega los parámetros solo si tienen valores válidos
    if (id !== undefined && id !== null) {
      params = params.set('id', id);
    }
    if (nombre && nombre.trim() !== '') {
      params = params.set('nombre', nombre.trim());
    }
  
    // Agrega los parámetros a la URL
    return this.http.get<any[]>(`${this.APIUrl}/Libro/`, { params });
  }


  addBookToList(val:any){
    return this.http.post(this.APIUrl+'/Libro',val)
  }

}
