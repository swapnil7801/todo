const createError = require('http-errors');

module.exports={
   userNotFound(email) {
    throw createError(404, `User ${email} not found.`);
  },
   invalidCredentials() {
    throw createError(401, 'Email/password  is not correct.');
  },
   invalidToken(err = '') {
    throw createError(401, `Authentication error. Token required. ${err}`);
  }
}

