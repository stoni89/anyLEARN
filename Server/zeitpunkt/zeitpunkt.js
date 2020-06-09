var db = require('../db');

var zeitpunkt = {
    getAllZeitpunkt: function(callback)
    {
        return db.query('SELECT * from zeitpunkt ORDER BY zeitpunkt', callback);
    }
}

module.exports = zeitpunkt;
