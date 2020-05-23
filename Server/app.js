var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors());

var userController = require('./user/userController');
var kategorieController = require('./kategorie/kategorieController');
app.use('/user', userController);
app.use('/kategorie', kategorieController);

module.exports = app;


// Bei Fehler folgendes in der SQL Workbench ausführen
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
