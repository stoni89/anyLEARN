var db = require('../db');

var select = {
    getSelectUserID: function(user_id, callback)
    {
        return db.query('SELECT s.skill, s.bereich_id, s.zeitpunkt_id, z.zeitpunkt, s.zeitaufwand, b.bereich, sst.status_id, sst.skillstatus_id, sst.user_id, sst.skill_id, sta.status, u.nachname, ' +
                               'sst.vermittler_id, uu.nachname AS vermittler ' +
                        'FROM skillstatus sst ' +
                        'INNER JOIN users u ON (u.user_id = sst.user_id) ' +
                        'INNER JOIN users uu ON (uu.user_id = sst.vermittler_id) ' +
                        'INNER JOIN skillkategorie sk ON (sk.skill_id = sst.skill_id) ' +
                        'INNER JOIN status sta ON (sta.status_id = sst.status_id) ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'INNER JOIN bereich b ON (b.bereich_id = s.bereich_id) ' +
                        'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                        'WHERE u.kategorie_id = sk.kategorie_id && sst.user_id IN (' + user_id + ')', callback);
    }
}

module.exports = select;
