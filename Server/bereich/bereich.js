var db = require('../db');

var bereich = {
    getAllBereich: function(callback)
    {
        return db.query('SELECT * from bereich ORDER BY bereich', callback);
    }
}

module.exports = bereich;
