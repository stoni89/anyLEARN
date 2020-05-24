var db = require('../db');

var user = {
    getAllUser: function(callback)
    {
        return db.query('SELECT u.user_id, u.vorname, u.nachname, u.name, u.kuerzel, u.rollen_id, u.kategorie_id, u.mail, u.istAktiv, r.rolle, k.kategorie FROM users u ' +
                        'INNER JOIN rollen r ON u.rollen_id = r.rollen_id ' +
                        'INNER JOIN kategorie k ON k.kategorie_id = u.kategorie_id', callback);
    },
    getSpezificUser: function(id, callback)
    {
        return db.query('SELECT * FROM users WHERE user_id = ' + id, callback);
    },
}

module.exports = user;
