var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors());

var userController = require('./user/userController');
var kategorieController = require('./kategorie/kategorieController');
var rollenController = require('./rollen/rollenController');
var skillController = require('./skill/skillController');
var bereichController = require('./bereich/bereichController');
var skillKategorieController = require('./skillkategorie/skillkategorieController');
var skillIDController = require('./skillID/skillIDController');
var userIDController = require('./userID/userIDController');
var skillstatusController = require('./skillstatus/skillstatusController');
var vermittlerController = require('./vermittler/vermittlerController');
var statusController = require('./status/statusController');
var postController = require('./mitteilung/mitteilungController');
var logsController = require('./logs/logsController');
var selectController = require('./selektieren/selektierenController');
app.use('/user', userController);
app.use('/kategorie', kategorieController);
app.use('/rollen', rollenController);
app.use('/skill', skillController);
app.use('/bereich', bereichController);
app.use('/skillkategorie', skillKategorieController);
app.use('/skillID', skillIDController);
app.use('/userID', userIDController);
app.use('/skillstatus', skillstatusController);
app.use('/vermittler', vermittlerController);
app.use('/status', statusController);
app.use('/post', postController);
app.use('/logs', logsController);
app.use('/selektieren', selectController);

module.exports = app;


// Bei Fehler folgendes in der SQL Workbench ausführen
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
