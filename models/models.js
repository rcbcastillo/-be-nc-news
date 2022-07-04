const db = require('../db/connection.js');

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;').then((databaseRes) => {
        //console.log(databaseRes, '<<--in the models')
        const topics  = databaseRes.rows;
        return topics;
    })
};