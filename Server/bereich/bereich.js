var db = require('../db');

var bereich = {
    getAllBereich: function(callback)
    {
        return db.query('SELECT * from bereich', callback);
    }
}

module.exports = bereich;
