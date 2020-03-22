module.exports = {validateLocations};

/**
 * Parses the request body from /v1/locations/average_location
 * and returns any errors
 *
 * @param {JSON} locations The list of locations
 * @return {JSON} The error to return, if any
 */
function validateLocations(locations) {
  const validationErrors = [];
  if (!locations) {
    validationErrors.push('There are no locations in the request body');
  } else {
    for (let i = 0; i < locations.length; i++) {
      const locationErr = parseLocation(locations[i], i);
      if (!!locationErr) validationErrors.push(locationErr);
    }
  }
  if (validationErrors.length === 0) return null;
  return {
    code: 400,
    body: {
      err: 'There was a problem validating the request body.',
      msg: validationErrors,
    },
  };
}

/**
 * Checks if the latitude/longitude is present in each location sent
 *
 * @param {JSON} location The lat and lng
 * @param {int} index The index we're at in the array
 * @return {array} The list of errors
 */
function parseLocation(location, index) {
  if (!location.lat && !location.lng) {
    return 'The lat and lng at index ' + index + ' are not present';
  }
  if (!location.lat) {
    return 'The lat at index ' + index + ' is not present.';
  }
  if (!location.lng) {
    return 'The lng at index ' + index + ' is not present.';
  }
  return null;
}
