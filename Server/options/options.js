var db = require('../db');

var options = {
    getuserOptions: function(id, callback)
    {
        return db.query('SELECT * FROM options WHERE user_id = ' + id, callback);
    }
}

module.exports = options;
