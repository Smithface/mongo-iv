const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const producerFilter = req.query.producer;
  let query = Film
    .find({})
    .sort('episode')
    // .populate('characters', 'name gender height skin_color')
    // .populate('planets', 'name climate terrain gravity diameter')
    .select('title producer')

  if (producerFilter) {
    query.where({ producer: /gary kurtz/i })
  }

    query.then(films => {
      res.status(200).json(films);
    })
    .catch();
});

module.exports = router;
