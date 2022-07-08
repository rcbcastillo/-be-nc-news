const express = require('express');
const app = express();
const {
  getTopics, 
  getArticles, 
  getArticlesById,
  getUsers,
  patchArticlesById,
  } = require('../controllers/controllers.js')

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/users', getUsers);

app.patch('/api/articles/:article_id', patchArticlesById);


app.use('*', (req, res) => {
  res.status(404).send({ message:'Invalid path' })
})


app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ message: 'Invalid request' })
  }
  if (err.code === '23502') {
    res.status(400).send({ message:'Invalid data' })
  }
  if (err.status && err.message) {
    res.status(err.status).send({message: err.message})
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send({message: 'something went wrong', err: err})
})

module.exports = app;