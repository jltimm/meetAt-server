const request = require('supertest');
const app = require('../../../api/meetAt');

let server;

beforeEach(async () => {
  server = await app.listen(4000);
  global.agent = request.agent(server);
});

describe('/v1/locations/center test, one location provided', () => {
  it('should return 200 OK, with the original location provided', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 44.9778,
            lng: -93.2650,
          }],
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      lat: 44.9778,
      lng: -93.2650,
    });
  });
});

describe('/v1/locations/center test, two identical locations provided', () => {
  it('should return 200 OK, with the centered location', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 44.9778,
            lng: -93.2650,
          }, {
            lat: 44.9778,
            lng: -93.2650,
          }],
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      lat: 44.9778,
      lng: -93.2650,
    });
  });
});

describe('/v1/locations/center test, two different locations provided', () => {
  it('should return 200 OK, with the centered location', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 44.9778,
            lng: -93.2650,
          }, {
            lat: 44.9537,
            lng: -93.0900,
          }],
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      lat: 44.9658,
      lng: -93.1775,
    });
  });
});

describe('/v1/locations/center test, five different locations provided', () => {
  it('should return 200 OK, with the centered location', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 44.9778,
            lng: -93.2650,
          }, {
            lat: 44.9537,
            lng: -93.0900,
          }, {
            lat: 44.8897,
            lng: -93.3499,
          }, {
            lat: 45.0941,
            lng: -93.3563,
          }, {
            lat: 44.9740,
            lng: -93.2277,
          }],
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      lat: 44.9779,
      lng: -93.2578,
    });
  });
});

describe('/v1/locations/center test, body doesn\'t contain locations', () => {
  it('should return 400 with the no locations error', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          location: [{
            lat: 44.9778,
            lng: -93.2650,
          }, {
            lat: 44.9537,
            lng: -93.0900,
          }],
        });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      err: 'There was a problem validating the request body.',
      msg: [
        'There are no locations in the request body',
      ],
    });
  });
});

describe('/v1/locations/center test, body contains a host of issues', () => {
  it('should return 400 with the list of issues', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 90.0001,
            lng: -45.0000,
          }, {
            lat: -90.0001,
            lng: -45.0000,
          }, {
            lat: 89.3445,
            lng: 180.0001,
          }, {
            lat: 89.3445,
            lng: -180.1111,
          }, {
            lt: 44.9537,
            lg: -93.0900,
          }, {
            lat: 44.9537,
            lng: -93.0900,
          }, {
            lat: 44.9537,
            lg: -93.0900,
          }, {
            lt: 44.9537,
            lng: -93.0900,
          }],
        });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      err: 'There was a problem validating the request body.',
      msg: [
        'The coordinates at index 0 are not valid.',
        'The coordinates at index 1 are not valid.',
        'The coordinates at index 2 are not valid.',
        'The coordinates at index 3 are not valid.',
        'The lat and lng at index 4 are not present',
        'The lng at index 6 is not present.',
        'The lat at index 7 is not present.',
      ],
    });
  });
});

afterEach(async () => {
  await server.close();
});

afterAll(async () => {
  await new Promise(
      (resolve) => setTimeout(() => resolve(), 500));
});
