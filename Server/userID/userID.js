var db = require('../db');

var userID = {
    getuserID: function(nachname, callback)
    {
        return db.query('SELECT user_id FROM users WHERE nachname = ' + '"' + nachname + '"', callback);
    }
}

module.exports = userID;
