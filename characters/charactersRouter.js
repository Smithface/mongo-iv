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
    .populate('homeworld')
    .then(char => {
      const key = char.key;
      Film.find({})
        .sort('episode')
        .select('character_ids title')
        .then(movies => {
          return movies.filter(movie => {
            return movie.character_ids.includes(key)})
          })
        .then(foundMovies => {
          fakeChar = char.toObject();
          fakeChar.movies = foundMovies
          res.status(200).json(fakeChar);
        })
        .catch(err => console.log(err));
      })
    .catch(err => {
      res.status(500).json(err);
    });

})

module.exports = router;
