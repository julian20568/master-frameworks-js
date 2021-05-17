'use strict'

//importar
var validator = require('validator');
var fs = require('fs');
var path = require('path');
//cargar el modelo o importar el modelo
var Article = require('../models/article');
const { patch } = require('../routes/article');
//const { exists } = require('../models/article');


//craer controlador
var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Julian Onbando',
            url: 'julianobandoweb.es',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    },

    //metodo para crear un nuevo articulo
    save: (req, res) => {
        //1. Recoger los parametros por post
        var params = req.body;
        //2. Validar datos (validator)
        try {
            //dará true cuando la variable params no este vacia
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_title && validate_content) {
            //3. Crear el objeto Guardar
            var article = new Article();
            //4. Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //5. Guardar el articulo-->utilizamos el modelo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //6. Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored//devuelve el articulo con la propiedad dentro
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    getArticles: (req, res) => {
        //find --> para sacar los datos de la base de datos
        //llamamos el modelo Articulo
        //utilizamos el metodo sort para ordenar los articulos  - o +
        Article.find({}).sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });
            }

            if (!articles) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar !!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles //traemos todos los productos
            });
        });


    },


    //listar 5 productos
    getLimitArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los productos'
                });
            }

            if (!articles) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay productos para mostrar !!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles //traemos todos los articulos
            });
        });
    },

    getArticle: (req, res) => {
        return res.status(404).send({
            status: 'error',
            message: 'No hay articulos para mostrar !!!'
        });
    },

    getArticle: (req, res) => {
        //recoger el id de la url
        var articleId = req.params.id;
        //comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }
        //buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

            //devolver en json
            return res.status(404).send({
                status: 'success',
                article
            });

        });
    },

    //creamos el metodo para actualizar el article

    updateArticle: (req, res) => {
        //1. recoger el id del producto por url
        var articleId = req.params.id;

        //2. Recoger los datos que llegan por put
        var params = req.body;

        //3. validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //4. find and update
            Article.findByIdAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar el articulo'
                    });
                }

                if (!articleUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }

                return res.status(500).send({
                    status: 'success',
                    article: articleUpdate
                });
            });
        } else {
            //devolver respuesta
            return res.status(500).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
    },

    deleteArticle: (req, res) => {
        //1. recoger el id de la url
        var articleId = req.params.id;
        //2. find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemove) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if (!articleRemove) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no existe'
                });
            }

            return res.status(400).send({
                status: 'succes',
                message: articleRemove
            });
        });
    },

    uploadArticles: (req, res) => {
        // Configurar el módulo del connect multiparty router/aritcle.js  (hecho)
        // Regoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if (!req.file) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir el nombre y la extensión
        var file_path = req.file.path;
        var file_split = file_path.split('\\');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extensión, sólo imágenes, si no es válida la extensión borrar fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {

            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida !!!'
                });
            });

        } else {
            // Si todo es valido, sacando id de la url
            var articleId = req.params.id;

            if (articleId) {
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {

                    if (err || !articleUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo !!!'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });
            }
        }

    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
 
        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                mesagge: 'La imagen no existe'
            });
        }
    },

    search: (req, res) => {
        // 1. Sacar el string a buscar
        var searchString = req.params.search;

        // 2. Find or
        Article.find({ "$or": [
            { "title": { "$regex": searchString, "$options": "i"}},
            { "content": { "$regex": searchString, "$options": "i"}}
        ]})
        //sort --> ordena de manera descendente
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    mesagge: 'Error en la petición',
                });
            }
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    mesagge: 'No hay articulos que coincidadn con tu busqueda !!!',
                });
            }
            return res.status(200).send({
                status: 'succes',
                articles
            });
        });
    }
}; //end controler-->fin del controlador

//ahora lo que hacemos es devolverlo, exportarlo
module.exports = controller;