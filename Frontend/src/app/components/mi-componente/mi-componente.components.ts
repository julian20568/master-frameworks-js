import { Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    template: `
        <h1>hola soy mi componente</h1>
        <p>Este es mi primer componente</p>
    `
})
export class Micomponente{
    constructor(){
        console.log("Componente, mi-componente cargado !!")
    }
}