module.exports = {getCenter};

/**
 * Converts radians to degrees
 *
 * @param {number} rad The radians
 * @return {number} The radians in degrees
 */
function rad2degr(rad) {
  return rad * 180 / Math.PI;
}

/**
 * Convert degrees to radians
 *
 * @param {number} degr The degrees
 * @return {number} The degrees in radians
 */
function degr2rad(degr) {
  return degr * Math.PI / 180;
}

/**
 * Gets the center of a group of coordinates
 *
 * @param {array} locations The coordinates
 * @return {JSON} The center of the coordinates
 */
function getCenter(locations) {
  if (locations.length == 1) {
    return locations[0];
  }
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (let i = 0; i < locations.length; i++) {
    const lat = degr2rad(locations[i].lat);
    const lng = degr2rad(locations[i].lng);
    // sum of cartesian coordinates
    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  const avgX = sumX / locations.length;
  const avgY = sumY / locations.length;
  const avgZ = sumZ / locations.length;

  // convert average x, y, z coordinate to latitude and longtitude
  const lng = Math.atan2(avgY, avgX);
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  const lat = Math.atan2(avgZ, hyp);

  return {
    lat: round(rad2degr(lat), 4),
    lng: round(rad2degr(lng), 4),
  };
}

/**
 * Rounds the given value to the given decimal place
 *
 * @param {number} value The number to round
 * @param {number} precision The decimal place to round to
 * @return {number} The rounded number
 */
function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
