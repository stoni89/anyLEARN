var db = require('../db');

var ueberschritten = {
    setUeberschrittenStart: function(callback)
    {
        return db.query('UPDATE skillstatus sst ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'INNER JOIN users u ON (u.user_Id = sst.user_id) ' +
                        'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                        'SET sst.ueberschritten = "true" ' +
                        'WHERE sst.status_id = 1 AND ' +
                        'DATE_ADD(u.eintritt, INTERVAL z.days DAY) < Now() AND ' +
                        'sst.ueberschritten = "false"', callback);
    },
    setUeberschrittenEnd: function(callback)
    {
        return db.query('UPDATE skillstatus sst ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'INNER JOIN users u ON (u.user_Id = sst.user_id) ' +
                        'INNER JOIN endzeitpunkt ez ON (ez.endzeitpunkt_id = s.endzeitpunkt_id) ' +
                        'SET sst.ueberschritten = "end" ' +
                        'WHERE sst.status_id < 4 AND  ' +
                        'DATE_ADD(u.eintritt, INTERVAL ez.days DAY) < Now()', callback);
    },
    setUeberschrittenStartFalse: function(callback)
    {
        return db.query('UPDATE skillstatus sst ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'INNER JOIN users u ON (u.user_Id = sst.user_id) ' +
                        'INNER JOIN zeitpunkt z ON (z.zeitpunkt_id = s.zeitpunkt_id) ' +
                        'SET sst.ueberschritten = "false" ' +
                        'WHERE sst.status_id < 4 AND ' +
                        'DATE_ADD(u.eintritt, INTERVAL z.days DAY) > Now() AND ' +
                        'sst.ueberschritten = "true"', callback);
    },
    setUeberschrittenEndFalse: function(callback)
    {
        return db.query('UPDATE skillstatus sst ' +
                        'INNER JOIN skills s ON (s.skill_id = sst.skill_id) ' +
                        'INNER JOIN users u ON (u.user_Id = sst.user_id) ' +
                        'INNER JOIN endzeitpunkt ez ON (ez.endzeitpunkt_id = s.endzeitpunkt_id) ' +
                        'SET sst.ueberschritten = "false" ' +
                        'WHERE sst.status_id < 4 AND  ' +
                        'DATE_ADD(u.eintritt, INTERVAL ez.days DAY) > Now()', callback);
    },
}

module.exports = ueberschritten;
