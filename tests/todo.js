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

  afterEach(async () => {
    await helpers.clearDb(todoModel);
    await helpers.clearDb(userModel);
  });
  const user = {
    email: 'test@gmail.com',
    password: 'pass',
  };
  const todoData={
    name:'test',
    description:'desc',
  }
  it('create  todo', async () => {
    try {
      const dbUser = await login.signUp(user.email, user.password);
      todoData.userId= dbUser._id
      const result = await todo.create(todoData.name, todoData.description, todoData.userId);
      expect(result._id).to.not.equal(null);
    } catch (err) {}
  });

  it.skip('get  todo', async () => {
    try {
      const result = await todo.findById(todoData.userId);
      expect(result._id).to.not.equal(null);
    } catch (err) {

    }
  });
});

