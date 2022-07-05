const db = require('../db/connection.js');
const format = require('pg-format');

exports.selectTopics = () => {
  return db
  .query('SELECT * FROM topics;')
  .then(({rows}) => {
    const topics  = rows;
    return topics;
  })
};


exports.selectArticleByID = (article_id) => {
  return db  
  .query(`
    SELECT * FROM articles 
    WHERE article_id = $1;`, [article_id])
  .then(({rows, rowCount}) => {

    if (rowCount === 0) {
      return Promise.reject({
        errorMessage:`article ${article_id} not found`,
      })
    }
    return rows[0];
  })
};

