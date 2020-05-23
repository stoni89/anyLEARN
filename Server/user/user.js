var db = require('../db');

var user = {
    getAllUser: function(callback)
    {
        return db.query('SELECT * from users', callback);
    }
}

module.exports = user;
