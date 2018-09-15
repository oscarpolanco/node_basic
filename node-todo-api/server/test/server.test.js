const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers)
beforeEach(populateTodos);

describe('POST/todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with a invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    // make sure get a 404 back
    const id = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  })
});

describe('DELETE/todos/:id', () => {
  it('should remove a todo', (done) => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query database using findById toNotExist
        // expect(null).toNotExist();
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((e) => done(e));
      })
  });

  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH/todos/:id', () => {
  it('should update the todo', (done) => {
    // grab id of first item
    const hexId = todos[0]._id.toHexString();
    const text = 'This should be the new text';

    // update text, set completed true
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200) // 200
      .expect((res) => { // text is changed, complete is true, completedAt is a number .toBeA
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toEqual('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    // grab id if second todo item
    const hexId = todos[1]._id.toHexString();
    const text = 'foo';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ // update text, set completed to false
        text,
        completed: false
      })
      .expect(200) // 200
      .expect((res) => { // text is changed, completed false, completedAt is null. toNotExist
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done);
  })
});
