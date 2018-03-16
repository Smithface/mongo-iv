const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicles = require('../vehicles/Vehicle');

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

router.get('/:id/vehicles', (req,res) => {
  const { id } = req.params;
  Character
    .findById(id)
    .sort('episode')
    .select('name')
    .then(char => {
      Vehicles.find({pilots: id})
        .select('vehicle_class')
        .then(wheels => {
          const character = {...char._doc, vehicles: wheels};
          res.send(character);
        })
        .catch(err => ({error: err}));
    })
    .catch(err => ({ error: err }));
});

module.exports = router;
