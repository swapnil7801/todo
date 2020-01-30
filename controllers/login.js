const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errors = require('./errors');

class UserController {
  constructor(Model) {
    this.Model = Model;
  }

  async signUp(email, password) {
    const dbUser = await this.Model.findOne({ email });
    if (dbUser) return false;
    const req = {
      email,
      password,
    };
    req.password = bcrypt.hashSync(req.password, 10);
    const user = new this.Model(req);
    return user.save();
  }

  async authenticate(email, password) {
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      throw errors.userNotFound(email);
    }
    const isauth = bcrypt.compareSync(password, dbUser.password);
    if (isauth) {
      dbUser.password = undefined;
      return dbUser;
    }
    throw errors.invalidCredentials();
  }
}

module.exports = new UserController(User);
