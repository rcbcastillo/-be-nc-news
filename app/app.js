const express = require('express');
const {getTopics} = require('../controllers/controllers.js')

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);


app.use('*', (req, res) => {
    res.status(404).send({ message:'Invalid path' })
})


app.use((err, req, res, next) => {
    res.status(500).send({message: 'something went wrong', err: err})
})

module.exports = app;