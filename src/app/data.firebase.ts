import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "./services/movies.model";
import { News } from "./news-component/news.model";

@Injectable()

export class DataServices{
    constructor(private httpCliente:HttpClient){}

    cargarMovies(){
        return this.httpCliente.get('https://pelicula-56a1a-default-rtdb.firebaseio.com/datos.json');
      }

    guardarMovies(movies:Movie[]){
        this.httpCliente.put('https://pelicula-56a1a-default-rtdb.firebaseio.com/datos.json',movies).subscribe(
            response=>console.log("Se han guardado las películas", response),
            error=>console.log("No se han guardado las películas",error)
        );
    }

    
    cargarNews(){
        return this.httpCliente.get('https://pelicula-56a1a-default-rtdb.firebaseio.com/news.json');
      }

    guardarNews(news:News[]){
        this.httpCliente.put('https://pelicula-56a1a-default-rtdb.firebaseio.com/news.json',news).subscribe(
            response=>console.log("Se han guardado las noticias", response),
            error=>console.log("No se han guardado las noticias",error)
        );
    }
}