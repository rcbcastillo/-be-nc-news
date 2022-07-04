const {selectTopics} = require('../models/models.js');


exports.getTopics = (req, res) => {
    selectTopics()
    .then((topics) => {
        //console.log(topics, '<<-- in the controller topics')
        res.status(200).send({topics})
    })
};