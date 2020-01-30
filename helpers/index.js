const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
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
        throw errors.invalidToken(err);
      }
    } else {
      throw errors.invalidToken();
    }
  },
  validate: validations => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  },
};
