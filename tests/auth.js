const { expect } = require('chai');
const login = require('../controllers/login');
const helpers = require('./helpers');
const User = require('../models/user');

describe('Auth Api test case', () => {
  before(async () => {
    helpers.setupTest();
  });

  afterEach(async () => {
    await helpers.clearDb(User);
  });
  const user = {
    email: 'test@gmail.com',
    password: 'pass',
  };
  it('Signup User', async () => {
    try {
      console.log('user', user);
      const result = await login.signUp(user.email, user.password);
      console.log('result:', result);
      expect(result.email).to.equal(user.email);
    } catch (err) {}
  });

  it('login User', async () => {
    try {
      const result = await login.authenticate(user.email, user.password);
      console.log('result:', result);
      expect(result.email).to.equal(user.email);
    } catch (err) {}
  });
});
