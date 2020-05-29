var db = require('../db');

var status = {
    getAllStatus: function(callback)
    {
        return db.query('SELECT * from status ORDER BY status_id', callback);
    }
}

module.exports = status;
