var db = require('../db');

var rollen = {
    getAllRollen: function(callback)
    {
        return db.query('SELECT * from rollen ORDER BY rollen_id', callback);
    }
}

module.exports = rollen;
