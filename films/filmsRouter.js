const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const producerFilter = req.query.producer;
  const releaseFilter = req.query.released;

  let query = Film
    .find({})
    .sort('episode')
    // .populate('characters', 'name gender height skin_color')
    // .populate('planets', 'name climate terrain gravity diameter')
    .select('title producer release_date created')

  if (producerFilter) {
    query.where({ producer: /gary kurtz/i })
  } else if (releaseFilter) {
    query.where({ release_date: /2005-*/ })
  }

    query.then(films => {
      res.status(200).json(films);
    })
    .catch();
});

// function toTitleCase(str)
// {
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }


module.exports = router;
