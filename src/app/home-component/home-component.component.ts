import { Component,  AfterViewInit, ElementRef, ChangeDetectorRef  } from '@angular/core';

import { Router } from '@angular/router';
import { NewsDataServiceService } from '../services/news-data-service.service';
import { DataServiceService } from '../services/data-service.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DataServices } from '../data.firebase';
import { MoviesService } from '../movies-service';
import { Movie } from '../services/movies.model';
import { News } from '../news-component/news.model';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})

export class HomeComponentComponent {
  title = 'app-unchartedBookStore';

  emp:any;

  constructor(private service: DataServiceService, private el: ElementRef, private newsService: NewsDataServiceService, private router: Router, private cdr: ChangeDetectorRef, private movieService:MoviesService){}

  listLibros:Movie[]=[];
  elementosAMostrar: number = 5;
  listNews:News[]=[];
  ModalActivate:boolean = false;
  searchTerm: string = '';
  pruebaHome: boolean = false;
  MoreLibros:any[]=[];

  ngOnInit():void{
    this.movieService.obtenerMovies().subscribe(misMovies=>{
      console.log(misMovies);
      this.listLibros=Object.values(misMovies);
      this.movieService.setMovies(this.listLibros);
    });


    this.movieService.obtenerNews().subscribe(misNews=>{
      console.log(misNews);
      this.listNews = Object.values(misNews);
      this.movieService.setNews(this.listNews);
    });


    this.traerData();
    this.pruebaNews();
  }


  traerData(){
    this.movieService.obtenerMovies().subscribe(misMovies=>{
    });
    console.log(this.listLibros);
  }

  traerMoreLibros(){
    this.service.getBookList().subscribe(data => {
      console.log(data);
      this.MoreLibros=data;
    })
  }

  pruebaNews(){
    this.newsService.getNews().subscribe(news =>{
      console.log(news);
      this.listNews = news;
    });
  }

  //Estructura de lista
  titulo:string = "";
  descripcion:string = "";
  autor:string = "";
  genero:string = "";

  //Api secretarias Id //
  secretariaId:number = 0;
  pi_nombre:string = "";
  pi_Id:number=0;
  urlImg:string = "";
  urlImageDefault = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"

  addClick(){
    this.ModalActivate = true;
  }

  closeClick(){
    this.ModalActivate = false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getBookList().subscribe(data => {
      this.listLibros=data;
    });
  }

  showLess:boolean =false;
  elementosMostrados: any[] = [];

  cargarMasElementos(): void {
    // this.traerMoreLibros();
    // this.elementosAMostrar += 5;
    // this.showLess = true;
  }

  cargarMenosElementos():void {
    // const elementosEliminados = this.MoreLibros.splice(-5);
    // if (elementosEliminados.length > 0) {
    //   console.log(elementosEliminados);
    //   this.showLess = false;
    //   this.cdr.detectChanges(); // Forzar la detección de cambios
    // }
  }


  redirectToNews(newsId: string): void {
    if (newsId !== undefined && newsId !== null) {
      console.log('Redirigiendo a la noticia con ID:', newsId);
      this.router.navigate(['/news', newsId]); // Asumiendo que la ruta es algo como '/news/:id'
    } else {
      console.error('El ID es undefined o null.');
    }
  }

  searchBooks() {
    if (this.searchTerm.trim() === '') {
      console.error('El término de búsqueda no puede estar vacío.');
      return;
    }
    
    this.service.getListByFilter(undefined, this.searchTerm).subscribe(
      (data) => {
        this.listLibros = data;
        console.log('registro Encontrado');
        this.searchTerm = '';
      },
      (error) => {
        console.error('Error al buscar libros:', error);
      }
    );
  }


  enviarData(){
    if (this.validarCampos()) {
      var val = {
        Titulo: this.titulo,
        Descripcion: this.descripcion,
        Autor: this.autor,
        Genero: this.genero,
        UrlImg: this.urlImg
      };
  
      // Llamar al método con la instancia de Movie
      this.movieService.agregarMovieServicio(val);
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
    return this.titulo && this.descripcion && this.autor && this.genero && this.urlImg;
  }

  limpiarCampos(): void {
    this.titulo = '';
    this.descripcion = '';
    this.autor = '';
    this.genero = '';
    this.urlImg = '';
  }


}
