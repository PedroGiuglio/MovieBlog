import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDataServiceService } from '../services/news-data-service.service';
import { DataServiceService } from '../services/data-service.service';
import { News } from './news.model';
import { MoviesService } from '../movies-service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-news-component',
  templateUrl: './news-component.component.html',
  styleUrls: ['./news-component.component.css']
})
export class NewsComponentComponent {

  constructor(private router: Router, private service: NewsDataServiceService, private portadas: DataServiceService,  private route: ActivatedRoute, private movieService: MoviesService){}

  news: News = { ID: 0, Titulo: '', Contenido: '', FechaPublicacion: new Date(), Autor: '', ImagenPortada: '' };
  listNews:News[]=[];

    //Estructura de lista
    titulo:string = "";
    contenido:string = "";
    fechaPublicacion:Date = new Date;
    autor:string = "";
    imagenPortada: string = "";
  

  ngOnInit():void{
    this.movieService.obtenerNews().subscribe(misNews=>{
      console.log(misNews);
      this.listNews = Object.values(misNews);
      this.movieService.setNews(this.listNews);
    });
  }

  enviarNoticia() {
    const data = {
      Titulo: this.titulo,
      Contenido: this.contenido,
      FechaPublicacion: this.fechaPublicacion.toISOString(), // Convierte la fecha a formato ISO
      Autor: this.autor,
      ImagenPortada: this.imagenPortada
    };

    // Llama al método agregarNewServicio del servicio de noticias
    this.movieService.agregarNewServicio(data);
  }

  enviarData(){
    if (this.validarCampos()) {
      var val = {
        Titulo: this.titulo,
        Contenido: this.contenido,
        Autor: this.autor,
        UrlImg: this.imagenPortada
      };
  
      // Llamar al método con la instancia de Movie
      this.movieService.agregarNewServicio(val);
      this.limpiarCampos();
    } else {
      alert("Todos los campos deben estar completos.");
    }
  }

  campoVacioValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isEmpty = !control.value || control.value.trim() === '';
      return isEmpty ? { 'campoVacio': { value: control.value } } : null;
    };
  }

  validarCampos() {
    return this.titulo && this.contenido && this.autor && this.imagenPortada;
  }

  limpiarCampos(): void {
    this.titulo = '';
    this.contenido = '';
    this.autor = '';
    this.imagenPortada = '';
  }


  listPortadas:any[]=[];

  getPortadas(){
    this.portadas.getBookList().subscribe(data =>{
      console.log(data);
      this.listPortadas = data;
    })
  }
}


