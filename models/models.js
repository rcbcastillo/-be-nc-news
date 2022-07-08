const db = require('../db/connection.js');
const format = require('pg-format');


exports.selectTopics = async () => {
  const {rows} = await db.query('SELECT * FROM topics');
  const topics = rows;
  return topics; 
};

exports.selectArticles = async () => {   
  const {rows} = await db.query('SELECT * FROM articles'); 
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

exports.selectUsers = async () => {
  const {rows} = await db.query('SELECT * FROM users');
  const users = rows;
  return users;
};