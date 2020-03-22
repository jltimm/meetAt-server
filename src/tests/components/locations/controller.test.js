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

afterEach(async () => {
  await server.close();
});

afterAll(async () => {
  await new Promise(
      (resolve) => setTimeout(() => resolve(), 500));
});
