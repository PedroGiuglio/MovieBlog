import { Injectable } from "@angular/core";
import { DataServices } from "./data.firebase";
import { Movie } from "./services/movies.model";
import { News } from "./news-component/news.model";

@Injectable()

export class MoviesService{
    
    constructor(private dataService:DataServices){}

    movies:Movie[]=[];

    // movies:Movie[]=[
    //     new Movie(1,"El Padrino","Mario Puzo","Crimen","Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York en los años 40. El hombre tiene cuatro hijos: Connie, Sonny, Fredo y Michael, que no quiere saber nada de los negocios sucios de su padre. Cuando otro capo, Sollozzo, intenta asesinar a Corleone, empieza una cruenta lucha entre los distintos clanes.","https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"),
    //     new Movie(2,"Oppenheimer","Christopher Nolan","Drama","Durante la Segunda Guerra Mundial, el teniente general Leslie Groves designa al físico J. Robert Oppenheimer para un grupo de trabajo que está desarrollando el Proyecto Manhattan, cuyo objetivo consiste en fabricar la primera bomba atómica.","https://revistasietearteshome.files.wordpress.com/2023/07/mv5bmdbmytzjnjutn2m1ms00mtq2ltk2odgtnzc2m2qyzge5ntvjxkeyxkfqcgdeqxvynzawmju2mty40._v1_.jpg"),
    //     new Movie(2,"Batman the dark knight","Christopher Nolan","Acción","La trilogía de The Dark Knight es una trilogía cinematográfica de superhéroes, basada en el personaje Batman de DC Comics. La trilogía consistió en Batman Begins, The Dark Knight, y The Dark Knight Rises, dirigidas, producidas y escritas principalmente por Christopher Nolan","https://i.pinimg.com/originals/cc/47/a5/cc47a507854dfe4ea145ebb4c9ae51c4.jpg")
    // ]


    news:News[]=[
      new News(1,"Movies everyone should watch at least once during their lifetime","I asked reddit what’s one movie everyone should watch at least once in their lifetime to compile a list of movies that everyone should watch.  Link to reddit threads www.reddit.com/r/Letterboxd/comments/1745vgp/whats_one_movie_you_think_everyone_should_watch/    www.reddit.com/r/movies/comments/178uqki/whats_a_movie_you_think_everyone_has_to_watch_at/    Feel free to comment on any movies you think should be added or maybe even removed. Thanks.", currentDate, "Pedro Prueba","https://i5.walmartimages.com/asr/deaf2e49-0946-4bae-996a-befc2d602ba1.13a380cc3fd906e3d918e67b593e138a.jpeg")
    ];


    setMovies(probamosMovies:Movie[]){
        this.movies=probamosMovies;
    }

    obtenerMovies(){
        return this.dataService.cargarMovies();
    }

    obtenerNews(){
      return this.dataService.cargarNews();
    }



    getNextMovieId(): number {
        // Calcular el próximo id basado en el último elemento del array
        const lastMovie = this.movies[this.movies.length - 1];
        return lastMovie ? lastMovie.id + 1 : 1;
      }

      agregarMovieServicio(data: any) {
        // Obtener el próximo id
        const nextId = this.getNextMovieId();
    
        // Crear una instancia de Movie con los datos proporcionados
        const movie = new Movie(
          nextId,
          data.Titulo,
          data.Autor,
          data.Genero,
          data.Descripcion,
          data.UrlImg
        );
    
        // Agregar el nuevo elemento al array
        this.movies.push(movie);
    
        // Guardar en el servicio de datos (si es necesario)
        this.dataService.guardarMovies(this.movies);
      }

      getNextNewId(): number {
        // Calcular el próximo id basado en el último elemento del array
        const lastNew = this.news[this.news.length - 1];
        return lastNew ? lastNew.ID + 1 : 1;
      }

      agregarNewServicio(data:any){
          // Obtener el próximo id
          const nextId = this.getNextNewId();
    
          // Crear una instancia de Movie con los datos proporcionados
          const noticia = new News(
            nextId,
            data.Titulo,
            data.Contenido,
            new Date(data.FechaPublicacion),
            data.Autor,
            data.ImagenPortada
          );
      
          // Agregar el nuevo elemento al array
          this.news.push(noticia);
      
          // Guardar en el servicio de datos (si es necesario)
          this.dataService.guardarNews(this.news);
      }

      setNews(probamosNews:News[]){
        this.news=probamosNews;
    }
}

const currentDate = new Date();
