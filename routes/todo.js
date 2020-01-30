const express = require('express');

const router = express.Router();
const Todo = require('../controllers/todo');

const { validateToken } = require('../helpers');

router.get('/:id', validateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.findById(id);
    return res.json(result);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
});
router.post('/', validateToken, async (req, res, next) => {
  try {
    const { name, description, userId } = req.body;
    const result = await Todo.create(name, description, userId);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.put('/:id', validateToken, async (req, res, next) => {
  try {
    const todoReq = { name: req.body.name, description: req.body.description, done: req.body.done };
    const { id } = req.params;
    const result = await Todo.updateById(id, todoReq);
    return res.json(result);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
});

router.delete('/:id', validateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.deleteById(id);
    return res.json(result);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
});
router.get('/list/:user', validateToken, async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Todo.findByUser(user);
    return res.json(result);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
});

module.exports = router;
