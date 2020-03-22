const request = require('supertest');
const app = require('../../../api/meetAt');

let server;

beforeEach(async () => {
  server = await app.listen(4000);
  global.agent = request.agent(server);
});

describe('/v1/locations/center Integration Test', () => {
  it('should return 200 OK with good values', async () => {
    const res = await global.agent
        .get('/v1/locations/center')
        .send({
          locations: [{
            lat: 45,
            lng: 45,
          }],
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      lat: 45,
      lng: 45,
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
