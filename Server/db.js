var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Mainz#01',
    database : 'anylearn'
});
module.exports=connection;
