const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

// server
  //  GET /
    // some test case
  //  GET / users
    // some test case
describe('Server', () => {
  describe('GET /', () => {
    it('should return hello world response', (done) => {
      request(app)
      .get('/')
      .expect(200)
      .expect('Hello world!!!')
      .end(done);
    });
  });

  describe('GET /users', () => {
    // Make a new test
    //  assert 200
    // Assert that you exist in user array
    it('should return an array of users', (done) => {
      request(app)
      .get('/users')
      .expect((res) => {
        expect(res.body)
        .toInclude({
          name: 'Test',
          age: 20
        });
      })
      .end(done);
    });
  });

  it('should return a page not found response', (done) => {
    request(app)
    .get('/error')
    .expect(404)
    .expect((res) => {
      expect(res.body).toInclude({
        error: 'Page not found'
      });
    })
    .end(done);
  });
});
