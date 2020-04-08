const validationService = require('../validation/service');
const calculateService = require('../calculate/service');

module.exports = {getCenter};

/**
 * Gets the center of a group of coordinates
 *
 * @param {array} locations Grabs the averaged coordinate
 * @return {Promise} Either the locations or the error
 */
function getCenter(locations) {
  const err = validationService.validateLocations(locations);
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    resolve(calculateService.getCenter(locations));
  });
}
