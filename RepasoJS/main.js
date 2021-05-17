
var nombre = "Julian Obando";
var altura = 190;

//document.write(nombre);
//document.write(altura);

/*
var concatenacion = nombre + ' ' + altura;

document.getElementById("datos");
datos.innerHTML = `
        <h1>Soy la caja de datos</h1>
        <h2>Mi nombre es: ${nombre}</h2>
        <h3>Mido: ${altura}</h3>
`;

if(altura >= 190){
    datos.innerHTML += 'Eres una persona Alta';
}else{
    datos.innerHTML += 'Eres una persona Bajita';
}

for(var i = 0; i<=2020; i++){
    //bloque de instrucciones
    datos.innerHTML += '<h2>Estamos en el año: ' + i;
}
*/

function MuestraMiNombre(nombre, altura){
    var misDatos = `
        <h1>Soy la caja de datos</h1>
        <h2>Mi nombre es: ${nombre}</h2>
        <h3>Mido: ${altura}</h3>
`;
return misDatos;
}

function imprimir(){
    var datos = document.getElementById('datos');
    datos.innerHTML = MuestraMiNombre('Julian Obando WEB!!', 190);
}

imprimir();

var nombres = ['Julian', 'Gisel', 'Sandra'];
document.write('<h1>Listado de nombres</h1>');

/*
for(i =0 ; i < nombres.length; i++){
    document.write(nombres[i] + '<br/>');
}
*/

//funcion de calvac
nombres.forEach((nombre) => {
    document.write(nombre + '<br/>');
});

//objetos json


var coche = {
    modelo: 'Mercedes Clase A',
    maxima: 500,
    antiguedad: 2020,
    mostrarDatos(){
        console.log(this.modelo, this.maxima, this.antiguedad);
    },
    propiedad1: 'valor aletorio'
};

document.write('<h1>'+coche.modelo+'</h1>');
coche.mostrarDatos();

//promesas

var saludar = new Promise((resolve, reject) => {
setTimeout(() => {
    let saludo = "Hola muy buenas a todos los chavales!!!";
    //saludo = false;
    if(saludo){
        resolve(saludo);
    }else{
        reject('No hay saludo disponible');
    }
}, 2000);
});

saludar.then(resultado => {
    alert(resultado);
})
.catch(err => {
    alert(err);
});