const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {
  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(33, 11);
      expect(res).toBe(44).toBeA('number');
    });
  });

  it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7).toBeA('number');
      done();
    });
  });

  it('should square a number', () => {
    var res = utils.square(2);
    expect(res).toBe(4).toBeA('number');
  });

  it('should async square a number', (done) => {
    utils.asyncSquare(2, (square) => {
      expect(square).toBe(4).toBeA('number');
      done();
    });
  });
});


it('should expect some values', () => {
  expect(12).toNotBe(11);
  // expect({name: 'Andrew'}).toBe({name: 'Andrew'});
  expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
  expect({name: 'andrew'}).toNotEqual({name: 'Andrew'});
  expect([2,3,4]).toInclude(4);
  expect([2,3,4]).toExclude(5);
  expect({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }).toInclude({
    age: 25
  });
  expect({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }).toExclude({
    age: 23
  });
});

// should verify first and last names are set
// assert it include firstName and lastName with proper values
it('should set firstName and lastName', () => {
  var user = {location: 'Philadelphia', age: 25};
  var res = utils.setName(user, 'Hello Test');

  expect(res).toInclude({
    firstName: 'Hello',
    lastName: 'Test'
  })
});
