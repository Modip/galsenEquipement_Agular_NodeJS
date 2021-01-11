//Imports

var express = require ('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

//Intanciation du server

var server = express();

// Config BodyParser

server.use(bodyParser.urlencoded({extended: true }));
server.use(bodyParser.json());

//Configurationdes routes
server.get('/', function(req, res){

    res.setHeader('Content-type', 'text/html');
    res.status(200).send('<h1>Bonjour bienvenue sur le server de Modip</h1>');

});

server.use('/api/', apiRouter);

//Lancer le server
server.listen(8080, function(){
    
    console.log('Server en écoute:)');
});