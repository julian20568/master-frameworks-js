'use strict'
//crear el modelo

//cargar mogoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//crear variable para definir la estructura que van a tener cada uno de los objetos y documentos
var ArticleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now}, //trae la fecha actual
    image: String
});

//exportar el modelo            nom-modelo-|-nom-esquema
module.exports = mongoose.model('Article', ArticleSchema);
//|crea coleccion con el nombre de articles y guarda documentos de esre tipo y con estructura dentro de la coleccion
