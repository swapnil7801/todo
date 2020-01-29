const express = require('express');

const router = express.Router();
const Login = require('../controllers/login');

router.post('/login', async (req, res, next) => {
  try {
    const result = await Login.authenticate(req.body.email, req.body.password);
    console.log('result', result);
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
router.post('/signup', async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const result = await Login.signUp(req.body.email, req.body.password);
    result.password = undefined;
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
