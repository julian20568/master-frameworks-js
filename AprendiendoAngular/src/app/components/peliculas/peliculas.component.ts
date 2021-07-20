import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  //definir la propiedad publica que va a ser peliculas
  public peliculas!: Array<any>;

  constructor() { 
    this.titulo = "Componente peliculas";
    //console.log("CONSTRUCTOR LANZADO")
    this.peliculas = [
      {year: 2014, title: "La pasión de Cristo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdbfISPM8BXHw9fSyL2gBgOZhkqEmVXtT0g&usqp=CAU'},
      {year: 2019, title: "Rey David", image: 'https://laopinion.com/wp-content/uploads/sites/3/2017/11/reydavid-record-univision-telenovelas.jpg?quality=80&strip=all&w=1000'},
      {year: 2020, title: "Moisés", image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/11/26170514/Moises-sf-1.jpg'},
      {year: 2021, title: "Moisés 2", image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/11/26170514/Moises-sf-1.jpg'}
    ];
  }

  ngOnInit(): void {
    console.log(this.peliculas);//mostrar el array en la consola del navegador
    console.log("Conponente iniciado !!!")
  }

  ngDoCheck(): void {
    console.log("DOCHECK LANZADO")
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
  }

  ngOnDestroy(){
    console.log("EL COMPONENTE SE VA A ELIMINAR")

  }

}
