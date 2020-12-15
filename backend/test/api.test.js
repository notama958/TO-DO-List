const request = require('supertest');
const app = require('../src/app');

// const check = (done, fn) => {
//   try {
//     fn();
//     done();
//   } catch (err) {
//     console.log(err);
//     done(err);
//   }
// };
describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'API - 👋🌎🌍🌏',
        },
        done
      );
  });
});
