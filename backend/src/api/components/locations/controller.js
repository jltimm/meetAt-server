const express = require('express');
const locationsRouter = new express.Router();

locationsRouter.get('/average_location', getAverageLocation);

module.exports = locationsRouter;

/**
 * Gets the average location from the coordinates provided
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getAverageLocation(req, res) {
  // TODO
  res.send('Hello, world!');
}
