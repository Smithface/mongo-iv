const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/:id', function (req,res) {
  const { id } = req.params;

  Character
    .findById(id)
    .sort('episode')
    .populate('homeworld')
    .populate('movies')
    .then(char => {
      console.log(char.movies);
      res.status(200).json(char);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

module.exports = router;
