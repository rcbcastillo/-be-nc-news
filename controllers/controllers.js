const {selectTopics, selectArticles, selectArticleByID} = require('../models/models.js');


exports.getTopics = (req, res) => {
  selectTopics()
  .then((topics) => {
      res.status(200).send({topics})
  })
};

exports.getArticles = (req, res) => {
  selectArticles()
  .then((articles) => {
      res.status(200).send({articles})
  })
};

exports.getArticlesById = (req, res) => {
  const {article_id} = req.params;

  selectArticleByID(article_id)
  .then((article) => {
      res.status(200).send({article})
  })
  .catch((err) => {
      console.log(err)
  })
};

