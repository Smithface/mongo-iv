const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const producerFilter = req.query.producer;
  const releaseFilter = req.query.release_date;

  let query = Film
    .find({})
    .sort('episode')
    // .populate('characters', 'name gender height skin_color')
    // .populate('planets', 'name climate terrain gravity diameter')
    .select('title producer release_date created')

  if (producerFilter) {
    query.where({ producer: { $regex: producerFilter, $options: 'i' }})
  } else if (releaseFilter) {
    query.where({ release_date: { $regex: releaseFilter, $options: 'i' }})
  }

    query.then(films => {
      res.status(200).json(films);
    })
    .catch(err => ({error: err}));
});

// function toTitleCase(str)
// {
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }

module.exports = router;
