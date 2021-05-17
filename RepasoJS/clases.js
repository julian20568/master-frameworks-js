//Clases
class Coche {

    constructor(modelo, velocidad, antiguedad){
    //propiedades
        this.modelo = modelo;
        this.velocidad = velocidad;
        this.antiguedad = antiguedad;
    }
    //acciones
    aumentarVelocidad(){
        this.velocidad += 1;
    }

    reducirVelocidad(){
        this.velocidad -= 1;
    }
}

//Herencia
class Autobus extends Coche {
    constructor(modelo, velocidad, antiguedad){
        super(modelo, velocidad, antiguedad);
        this.altura = 5;
    }

    mostrarAltura(){
        return "La altura del bus es: "+this.altura;
    }
}

var autobus1 = new Autobus('PEGASUS', 200, 2017);
console.log(autobus1.mostrarAltura());

var coche1 = new Coche('BMW', 200, 2017);
var coche2 = new Coche('Audi', 100, 2018);
var coche3 = new Coche('Mercedes', 200, 2017);
var coche4 = new Coche('Renault', 200, 2017);

//console.log(coche1);
//console.log(coche2);

document.write("<h1>Velocidad: "+coche1.velocidad+"</h1>");
console.log(autobus1);


coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
document.write("<h1>Velocidad: "+coche1.velocidad+"</h1>");