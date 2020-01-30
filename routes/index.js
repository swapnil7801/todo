const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/sign-up', (req, res, next) => {
  res.render('signup', { title: 'Express' });
});
router.get('/home', (req, res, next) => {
  res.render('home', { title: 'Express' });
});
module.exports = router;
