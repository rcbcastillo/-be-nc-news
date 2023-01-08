const db = require('../db/connection.js');
const format = require('pg-format');

exports.selectTopics = async () => {
  const {rows} = await db.query('SELECT * FROM topics');
  const topics = rows;
  return topics; 
};

exports.selectArticles = async (columnName = 'created_at') => {
  const queryStr = format(`
  SELECT articles.*, COUNT(comments.article_id) as comment_count 
  FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id
  GROUP BY 1
  ORDER BY %I DESC;`, columnName);

  const {rows} = await db.query(queryStr);
  const articles = rows;
  return articles;
};

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

exports.selectCommentsByArticleId = async (article_id) => {
  const queryStr = `
  SELECT comments.comment_id, comments.votes, comments.created_at, comments.body, users.username AS author FROM comments
    LEFT JOIN users
    ON users.username = comments.author
    WHERE article_id = $1;`;

  const {rows} = await db.query(queryStr, [article_id]);  
  const comments = rows;
  
  if (rows.rowCount === 0) {
    return Promise.reject({ status: 404, msg: 'Article not found' });
  }
  
  return comments;
};