const https = require('https');
const validationService = require('../validation/service');

module.exports = {getNearByLocationsFromCoordinates};

/**
 * Makes a call to the Google Places API and returns data
 *
 * @param {number} lat The latitude
 * @param {number} lng The longitude
 * @param {function} callback The callback function
 */
function getNearByLocations(lat, lng, callback) {
  const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.PLACES_KEY}`;
  https.get(requestUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      const nearByLocations = JSON.parse(data).results;
      callback(nearByLocations, null);
    });
  });
}

/**
 * Gets the nearby locations from a coordinate
 *
 * @param {JSON} coordinates The centered coordinates
 * @param {function} callback The callback
 */
function getNearByLocationsFromCoordinates(coordinates, callback) {
  const err = validationService.validateLocations([coordinates]);
  if (!!err) {
    callback(err, null);
    return;
  }
  getNearByLocations(
      coordinates.lat, coordinates.lng, (nearByLocations, err) => {
        if (!!err) {
          const ret = {
            code: 500,
            body: {
              err: 'Issue with call to external service',
              msg: err,
            },
          };
          callback(ret, null);
        }
        callback(null, nearByLocations);
      });
}
