var db = require('../db');

var zeitpunkt = {
    getAllZeitpunkt: function(callback)
    {
        return db.query('SELECT * from zeitpunkt ORDER BY zeitpunkt', callback);
    },
    getAllEndZeitpunkt: function(callback)
    {
        return db.query('SELECT * from endzeitpunkt ORDER BY endzeitpunkt', callback);
    }
}

module.exports = zeitpunkt;
