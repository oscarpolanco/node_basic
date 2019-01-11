const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  });
  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'foo',
      room: 'The office fans'
    };
    const reUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    const userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    const newUsers = users.removeUser('1');

    expect(newUsers.length).toBe(2);
  });

  it('should not remove user', () => {
    const newUsers = users.removeUser('11');

    expect(newUsers.length).toBe(3);
  });

  it('should find user', () => {
    const user = users.getUser('1');

    expect(user).toMatchObject(users.users[0]);
  });

  it('should not find user', () => {
    const user = users.getUser('22');

    expect(user).toBeFalsy();

  });
});
