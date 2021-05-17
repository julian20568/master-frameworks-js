'use strict'

var express = require('express');
//cargamos el controlador
var ArticleControler = require('../controllers/article');//-->trae lo que tiene el article.js en la carpeta controlador
//llamar al router
var router = express.Router();

var crypto = require('crypto');
var multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './upload/articles');
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });
    },
});
var mul_upload = multer({ dest: './upload/articles', storage });

//creamos rutas --> Rutas de prueba
router.post('/datos-curso', ArticleControler.datosCurso);
router.get('/test-de-controlador', ArticleControler.test);


//rutas para articulos --> Rutas utiles
router.post('/save', ArticleControler.save);
router.get('/articles', ArticleControler.getArticles);
router.get('/articles/:last?', ArticleControler.getLimitArticles);//parametro opcional por la url
router.get('/article/:id', ArticleControler.getArticle);//parametro obligatorio
router.put('/article/:id', ArticleControler.updateArticle);
router.delete('/article/:id', ArticleControler.deleteArticle);
router.post('/upload-image/:id', mul_upload.single('file0'), ArticleControler.uploadArticles);
router.get('/get-image/:image', ArticleControler.getImage);
router.get('/search/:search', ArticleControler.search);

//exportar el modulo para poder usuarlas en cualquier parte y se usa en el archivo app.js
module.exports = router;