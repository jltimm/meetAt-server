const validationService = require('../validation/service');

module.exports = {getAverage};

/**
 * Averages the coordinates
 *
 * @param {array} locations Grabs the averaged coordinate
 * @param {function} callback The callback
 */
function getAverage(locations, callback) {
  // TODO: Actually implement
  const err = validationService.validateLocations(locations);
  if (!!err) {
    callback(err, null);
    return;
  }
  console.log(locations);
  callback(null, locations[0]);
}
