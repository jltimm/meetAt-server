const express = require('express');
const nearByRouter = new express.Router();
const nearByService = require('./service');

nearByRouter.get('/nearby_locations', getNearByLocationsFromCoordinates);

module.exports = nearByRouter;

/**
 * Gets the average location from the coordinates provided
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getNearByLocationsFromCoordinates(req, res) {
  nearByService
      .getNearByLocationsFromCoordinates(
          req.body, (err, averageLocation) => {
            if (err) {
              res.status(err.code).send(err.body);
            } else {
              res.send(averageLocation);
            }
          });
}
