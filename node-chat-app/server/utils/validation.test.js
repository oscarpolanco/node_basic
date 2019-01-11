const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

//  isRealString
describe('isRealString', () => {
  // should reject non-string values
  it('should reject no-string values', () => {
    const result = isRealString(99);
    expect(result).toBeFalsy();
  });

  // should reject string with only spaces
  it('should reject string with only spaces', () => {
    const result = isRealString('    ');
    expect(result).toBeFalsy();
  });

  // should allow string with non-spaces characters
  it('should allow string with non-spaces characters', () => {
    const result = isRealString('test');
    expect(result).toBeTruthy();
  });
});
