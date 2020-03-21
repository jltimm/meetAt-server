module.exports = {validateLocations};

/**
 * Parses the request body from /v1/locations/average_location
 * and returns any errors
 *
 * @param {JSON} body The request body
 * @return {JSON} The error to return, if any
 */
function validateLocations(body) {
  const validationErrors = [];
  const locations = body.locations;
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
 * @param {JSON} location The lat and long
 * @param {int} index The index we're at in the array
 * @return {array} The list of errors
 */
function parseLocation(location, index) {
  if (!location.lat && !location.long) {
    return 'The lat and long at index ' + index + ' are not present';
  }
  if (!location.lat) {
    return 'The lat at index ' + index + ' is not present.';
  }
  if (!location.long) {
    return 'The long at index ' + index + ' is not present.';
  }
  return null;
}
