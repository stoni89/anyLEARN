var db = require('../db');

var user = {
    getAllUser: function(callback)
    {
        return db.query('SELECT u.user_id, u.vorname, u.nachname, u.name, u.kuerzel, u.rollen_id, u.kategorie_id, u.mail, u.istAktiv, r.rolle, k.kategorie FROM users u ' +
                        'INNER JOIN rollen r ON u.rollen_id = r.rollen_id ' +
                        'INNER JOIN kategorie k ON k.kategorie_id = u.kategorie_id ' +
                        'ORDER BY u.name', callback);
    },
    getSpezificUser: function(id, callback)
    {
        return db.query('SELECT * FROM users WHERE user_id = ' + id, callback);
    },
    newUser: function(postdata, callback)
    {
      return db.query('INSERT INTO users (vorname, nachname, name, kategorie_id, rollen_id, kuerzel, mail, istAktiv) ' +
                      'values(?, ?, ?, ?, ?, ?, ?, ?)', [postdata.vorname, postdata.nachname, postdata.name, postdata.kategorie_id, postdata.rollen_id, postdata.kuerzel, postdata.mail, postdata.istAktiv], callback)
    },
    updateUser: function(postdata, callback)
    {
      return db.query('UPDATE users SET vorname=?, nachname=?, name=?, kategorie_id=?, rollen_id=?, kuerzel=?, mail=?, istAktiv=? ' +
                      'WHERE user_id=?', [postdata.vorname, postdata.nachname, postdata.name, postdata.kategorie_id, postdata.rollen_id, postdata.kuerzel, postdata.mail, postdata.istAktiv, postdata.user_id], callback)
    }
}

module.exports = user;
