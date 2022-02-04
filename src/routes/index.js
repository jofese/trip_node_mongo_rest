const express = require('express');
const router = express.Router();
const TripController = require('../controllers/tripController');
const middlewares = require('../utils/middlewares');


module.exports = function(){

    router.get('/trips/v1',TripController.get);
    router.post('/trips/v1',middlewares.validateReadings ,TripController.post);

    return router;
}