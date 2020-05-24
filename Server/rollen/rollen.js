var db = require('../db');

var rollen = {
    getAllRollen: function(callback)
    {
        return db.query('SELECT * from rollen', callback);
    }
}

module.exports = rollen;
