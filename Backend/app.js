'use strict'

//cargar modulos de node para cargar el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routes = require('./routes/article');


//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS --> Acceso cruzado entre dominios), para permitir las llamadas de las peticiones
// http o Ajax al api-rest de cualquier Font-End.

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos a rutas / cargar rutas
app.use('/api',article_routes);

//Ruta o metodo de prueba para el API REST
/*
app.get('/probando', (req, res) => {
    //console.log("HOLA MUNDO");

    //devolver datos
    /*return res.status(200).send(`
        <ul>
            <li>NodeJS</li>
            <li>Angular</li>
            <li>React</li>
            <li>Vue</li>
        <ul/>
    `);*/
/*
    //Devolver un JSON
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Julian Onbando',
        url: 'julianobandoweb.es'
    });
});*/

//exportar el modulo (fichero actual)
module.exports = app;

//sesion 69 quede