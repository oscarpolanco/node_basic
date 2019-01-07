const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
      // store res in variable
      const message = generateMessage('Admin', 'test');

      // assert from match
      expect(message).toMatchObject({
        from: 'Admin'
      });
      // assert text match
      expect(message).toMatchObject({
        text: 'test'
      });
      // assert createAt IS A NUMBER
      const type = typeof(message.createAt);
      expect(type).toBe("number");
    });
});
