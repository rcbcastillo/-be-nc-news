const db = require('../db/connection.js');
const format = require('pg-format');


exports.selectTopics = async () => {
  try {
    const {rows} = await db.query('SELECT * FROM topics');
    const topics = rows;
    return topics;
  } catch (err) {
    console.err(err);
  }
};

exports.selectArticles = async () => {
   
  try {
    const {rows} = await db.query('SELECT * FROM articles'); // returns promise
    const articles = rows;
    return articles;
  } catch (err) {
    console.err(err);
    next(err);
  }  

}

exports.selectArticleByID = async (article_id) => {
  const queryStr = format(`
  SELECT * FROM articles 
  WHERE article_id = $1;`);

  try {
    const {rows} = await db.query(queryStr, [article_id]);
    const article = rows[0];
    return article;
  } catch (err) {
    console.log(err)
    next(err);
  }

}

