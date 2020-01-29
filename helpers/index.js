const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const errors = require('../controllers/errors');

module.exports = {
  issueToken: (email) => {
    const payload = { email };
    const options = { expiresIn: '2d', issuer: 'todoAPP' };
    const secret = config.JWT_SECRET;
    return jwt.sign(payload, secret, options);
  },
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2d',
        issuer: 'todoAPP',
      };
      try {
        const result = jwt.verify(token, config.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        console.log("err1",err)
        throw errors.invalidToken(err);
      }
    } else {
      console.log("err2",err)
      throw errors.invalidToken();
    }
  },
};
