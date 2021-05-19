import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;

  constructor() { 
    this.titulo = "Componente peliculas";
    console.log("CONSTRUCTOR LANZADO")
  }

  ngOnInit(): void {
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
