const express = require('express');
const locationsRouter = new express.Router();
const locationsService = require('../locations/service');

locationsRouter.get('/center', getCenter);

module.exports = locationsRouter;

/**
 * Gets the average location from the coordinates provided
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getCenter(req, res) {
  locationsService.getCenter(req.body.locations, (err, averageLocation) => {
    if (err) {
      res.status(err.code).send(err.body);
    } else {
      res.send(averageLocation);
    }
  });
}
