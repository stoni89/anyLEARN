var db = require('../db');

var skillID = {
    getskillID: function(name, callback)
    {
        return db.query('SELECT skill_id FROM skills WHERE skill = ' + '"' + name + '"', callback);
    }
}

module.exports = skillID;
