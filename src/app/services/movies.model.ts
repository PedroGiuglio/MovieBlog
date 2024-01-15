export class Movie {
    // Propiedades del objeto
    id: number;
    titulo: string;
    autor: string;
    genero: string;
    descripcion: string;
    urlImg: string;
  
    // Constructor para inicializar propiedades
    constructor(id: number, titulo: string, autor: string, genero: string, descripcion: string, urlImg: string) {
      this.id = id;
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.descripcion = descripcion;
      this.urlImg = urlImg;
    }
  
    // Métodos (si es necesario)
    obtenerInformacion(): string {
      return `${this.titulo} - ${this.autor}`;
    }
  }