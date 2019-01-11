const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin';
    const url = "https://www.google.com/maps?q=1,1";
    const message = generateLocationMessage(from, 1, 1);

    expect(message).toMatchObject({
      from,
      url
    });

    const type = typeof(message.createAt);
    expect(type).toBe("number");
  });
});
