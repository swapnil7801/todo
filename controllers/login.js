// repositories/TodoRepository
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

class UserController {
  constructor(model) {
    this.model = model;
  }

  async signUp(email, password) {
    const dbUser = await this.model.findOne({ email });
    if (dbUser) return false;
    const req = {
      email,
      password,
    };
    req.password = bcrypt.hashSync(req.password, 10);
    const user = new this.model(req);
    return user.save();
  }

  async authenticate(email, password) {
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      throw createError(404, 'User not found.');
    }
    const isauth = bcrypt.compareSync(password, dbUser.password);
    if (isauth) {
      dbUser.password = undefined;
      return dbUser;
    }
    throw createError(401, 'wrong credentials.');
  }
}

module.exports = new UserController(User);
