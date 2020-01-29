const express = require('express');

const router = express.Router();
const Login = require('../controllers/login');
const helper = require('../helpers');

router.post('/login', async (req, res, next) => {
  try {
    const result = await Login.authenticate(req.body.email, req.body.password);
    console.log('result', result);
    // Create a token
    const token = helper.issueToken(req.body.email);
    res.json({ token, result });
  } catch (error) {
    console.log('e1', error);
    return next(error);
  }
});
router.post('/signup', async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const result = await Login.signUp(req.body.email, req.body.password);
    result.password = undefined;
    const token = helper.issueToken(req.body.email);
    res.json({ result, token });
  } catch (error) {
    console.log('e2', error);
    return next(error);
  }
});

module.exports = router;
