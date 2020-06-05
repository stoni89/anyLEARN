var app = require('./app');

/*
var fs = require('fs');
var key = fs.readFileSync('./key.pem');
var cert = fs.readFileSync( './server.crt' );
var ca = fs.readFileSync( './csr.pem' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};

var port = process.env.PORT || 3000;

var https = require('https');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
https.createServer(options, app).listen(port);
*/


var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});


