var db = require('../db');

var links = {
    getAllLinks: function(callback)
    {
        return db.query('SELECT * from skilllinks', callback);
    },
    getSpezificLinks: function(id, callback)
    {
        return db.query('SELECT * from skilllinks WHERE skill_id = ' + id, callback);
    },
    newLink: function(postdata, callback)
    {
      return db.query('INSERT INTO skilllinks (skill_id, bezeichnung, url) ' +
                      'values(?, ?, ?)', [postdata.skill_id, postdata.bezeichnung, postdata.url], callback)
    },
    removeLink: function(id, callback)
    {
      return db.query('DELETE FROM skilllinks WHERE skilllink_id = ' + id, callback)
    },
}

module.exports = links;
