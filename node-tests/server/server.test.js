const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

it('should return hello world response', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Hello world!!!')
    .end(done);
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
