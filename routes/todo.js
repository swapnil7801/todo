const express = require('express');

const router = express.Router();
const Todo = require('../controllers/todo');

router.get('/todo/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.findById(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
router.post('/todo', async (req, res, next) => {
  try {
    const { name, description, userId } = req.body;
    const result = await Todo.create(name, description, userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.put('/todo/:id', async (req, res, next) => {
  try {
    const todoReq = { name: req.body.name, description: req.body.description, done: req.body.done };
    const { id } = req.params;
    const result = await Todo.updateById(id, todoReq);
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete('/todo/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.deleteById(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
router.get('/todo/list/:user', (req, res, next) => {
  res.send('respond with a resource');
});
module.exports = router;
