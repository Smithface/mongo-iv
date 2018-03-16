const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req,res) => {
  Vehicle
    .find({})
    .select('vehicle_class')
    .then(wheels => {
      res.status(200).json(wheels)
    })
    .catch(err => ({ error: err }));
});

module.exports = router;
