const https = require('https');
const validationService = require('../validation/service');

module.exports = {getNearByLocationsFromCoordinates};

/**
 * Makes a call to the Google Places API and returns data
 *
 * @param {number} lat The latitude
 * @param {number} lng The longitude
 * @return {Promise} Either the nearby locations or the error
 */
function getNearByLocations(lat, lng) {
  return new Promise((resolve, reject) => {
    const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.PLACES_KEY}`;
    https.get(requestUrl, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const nearByLocations = JSON.parse(data).results;
        resolve(nearByLocations, null);
      });
    });
  });
}

/**
 * Gets the nearby locations from a coordinate
 *
 * @param {JSON} coordinates The centered coordinates
 * @return {Promise} Either near by locations or an error
 */
function getNearByLocationsFromCoordinates(coordinates) {
  return new Promise((resolve, reject) => {
    const err = validationService.validateLocations([coordinates]);
    if (!!err) {
      reject(err);
      return;
    }
    getNearByLocations(coordinates.lat, coordinates.lng)
        .then((nearByLocations) => {
          resolve(nearByLocations);
        }).catch((err) => {
          const ret = {
            code: 500,
            body: {
              err: 'Issue with call to external service',
              msg: err,
            },
          };
          reject(ret);
        });
  });
}
