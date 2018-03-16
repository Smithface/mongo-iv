const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');

const router = express.Router();

// add endpoints here
router.get('/:id', function (req,res) {
  const { id } = req.params;
  // const charQuery = Character
  Character
    .findById(id)
    .sort('episode')
    .select('name')
    .populate('homeworld', 'name terrain climate diameter gravity')
    .then(char => {
      Film.find({ characters: id })
        .select('title producer director episode release_date')
        .then(flicks => {
          const character = {...char._doc, movies: flicks};
          res.send(character);
      })})
      .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
