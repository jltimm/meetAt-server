const validationService = require('../validation/service');
const calculateService = require('../calculate/service');

module.exports = {getCenter};

/**
 * Gets the center of a group of coordinates]
 *
 * @param {array} locations Grabs the averaged coordinate
 * @param {function} callback The callback
 */
function getCenter(locations, callback) {
  const err = validationService.validateLocations(locations);
  if (!!err) {
    callback(err, null);
    return;
  }
  callback(null, calculateService.getCenter(locations));
}
