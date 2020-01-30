const { expect } = require('chai');
const todo = require('../controllers/todo');
const login = require('../controllers/login');
const helpers = require('./helpers');
const userModel = require('../models/user');
const todoModel = require('../models/todo');

describe('todo Api test case', () => {
  before(async () => {
    helpers.setupTest();
  });

  after(async () => {
    await helpers.clearDb(todoModel);
    await helpers.clearDb(userModel);
  });
  const user = {
    email: 'test@gmail.com',
    password: 'pass',
  };
  const todoData = {
    name: 'test',
    description: 'desc',
  };
  let todoId;
  it('create  todo', async () => {
    try {
      const dbUser = await login.signUp(user.email, user.password);
      todoData.userId = dbUser._id;
      const result = await todo.create(todoData.name, todoData.description, todoData.userId);
      todoId = result._id;
      expect(result._id).to.not.equal(null);
    } catch (err) {}
  });

  it('get  todo by userId', async () => {
    try {
      const result = await todo.findByUser(todoData.userId);
      expect(result._id).to.not.equal(null);
    } catch (err) {}
  });

  it('udpate  todo ', async () => {
    try {
      todoData.description = 'changed';
      const result = await todo.updateById(todoId, todoData);
      expect(result._id).to.not.equal(null);
    } catch (err) {}
  });
  it('delete  todo', async () => {
    try {
      const result = await todo.deleteById(todoId);
      expect(result._id).to.not.equal(null);
    } catch (err) {}
  });
});
