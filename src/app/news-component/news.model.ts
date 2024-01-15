export class News {
  ID: number;
  Titulo: string;
  Contenido: string;
  FechaPublicacion: Date;
  Autor: string;
  ImagenPortada: string;

  constructor(
    id: number,
    titulo: string,
    contenido: string,
    fechaPublicacion: Date,
    autor: string,
    imagenPortada: string
  ) {
    this.ID = id;
    this.Titulo = titulo;
    this.Contenido = contenido;
    this.FechaPublicacion = fechaPublicacion;
    this.Autor = autor;
    this.ImagenPortada = imagenPortada;
  }

  }