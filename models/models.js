const db = require('../db/connection.js');

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;').then((databaseRes) => {
        const topics  = databaseRes.rows;
        return topics;
    })
};