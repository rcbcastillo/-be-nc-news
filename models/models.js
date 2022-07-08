const db = require('../db/connection.js');


exports.selectTopics = async () => {
  const {rows} = await db.query('SELECT * FROM topics');
  const topics = rows;
  return topics; 
};

exports.selectArticles = async () => {   
  const {rows} = await db.query('SELECT * FROM articles'); 
  const articles = rows;
  return articles;
}

exports.selectArticleByID = async (article_id) => {
  const queryStr = `
    SELECT articles.*, COUNT(comments.article_id) as comment_count
    FROM articles 
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY 1;`;
  const {rows} = await db.query(queryStr, [article_id]);
  const article = rows[0];
  return article;    
};

exports.updateArticleByID = async (inc_votes, article_id) => {
  const queryStr = `
  UPDATE articles
  SET votes = votes + $1 
  WHERE article_id = $2
  RETURNING *;`;

  const {rows} = await db.query(queryStr, [inc_votes, article_id]);
  const article = rows[0];

  if (rows.rowCount === 0) {
    return Promise.reject({ status: 404, msg: 'Article not found' });

  }
  return article;
};

exports.selectUsers = async () => {
  const {rows} = await db.query('SELECT * FROM users');
  const users = rows;
  return users;
};