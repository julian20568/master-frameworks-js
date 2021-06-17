import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//añadido

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombre!: string;
  public apellidos!: string;

  constructor(
    private _route: ActivatedRoute, //sacar parametros de la url
    private _router: Router //hacemos redirecciones a otras paginas
  ){ }

  ngOnInit(): void {
    //añadimos estas lineas
    this._route.params.subscribe((params: Params) => {
        this.nombre = params.nombre;
        this.apellidos = params.apellidos;
    });
  }

  //creando el metodo
  redireccion(){
    //alert("METODO REDIRECCIÓN")
    //this._router.navigate(['/formulario'])
    this._router.navigate(['/pagina-de-pruebas', 'Julián', 'Obando WEB'])
  }

}
