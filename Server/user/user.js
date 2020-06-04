var db = require('../db');

var user = {
    getAllUser: function(callback)
    {
        return db.query('SELECT u.user_id, u.vorname, u.nachname, u.name, u.kuerzel, u.rollen_id, u.kategorie_id, u.mail, u.istAktiv, r.rolle, k.kategorie FROM users u ' +
                        'INNER JOIN rollen r ON u.rollen_id = r.rollen_id ' +
                        'INNER JOIN kategorie k ON k.kategorie_id = u.kategorie_id ' +
                        'ORDER BY u.name', callback);
    },
    getAllUserAktiv: function(callback)
    {
        return db.query('SELECT u.user_id, u.vorname, u.nachname, u.name, u.kuerzel, u.rollen_id, u.kategorie_id, u.mail, u.istAktiv, r.rolle, k.kategorie FROM users u ' +
                        'INNER JOIN rollen r ON u.rollen_id = r.rollen_id ' +
                        'INNER JOIN kategorie k ON k.kategorie_id = u.kategorie_id ' +
                        'WHERE istAktiv = true ' +
                        'ORDER BY u.name', callback);
    },
    getAllUserAktivAzubi: function(callback)
    {
        return db.query('SELECT u.user_id, u.vorname, u.nachname, u.name, u.kuerzel, u.rollen_id, u.kategorie_id, u.mail, u.istAktiv, r.rolle, k.kategorie FROM users u ' +
                        'INNER JOIN rollen r ON u.rollen_id = r.rollen_id ' +
                        'INNER JOIN kategorie k ON k.kategorie_id = u.kategorie_id ' +
                        'WHERE istAktiv = true && u.rollen_id = 1 ' +
                        'ORDER BY u.name', callback);
    },
    getSpezificUser: function(id, callback)
    {
        return db.query('SELECT * FROM users WHERE user_id = ' + id, callback);
    },
    getSpezificUserMail: function(mail, callback)
    {
        return db.query('SELECT u.user_id, u.mail, u.vorname, u.name, u.rollen_id, u.istAktiv, r.rolle FROM users u INNER JOIN rollen r ON (r.rollen_id = u.rollen_id) WHERE mail = ' + '"' + mail + '"', callback);
    },
    getMaxUserID: function(callback)
    {
      return db.query('SELECT max(user_id) AS user_id FROM users', callback);
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
