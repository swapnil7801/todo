const TodoModel = require('../models/Todo');

class Todo {
  constructor(model) {
    this.model = model;
  }

  create(name, desc, userId) {
    const newTodo = {
      name, description: desc, userId, done: false,
    };
    const todo = new this.model(newTodo);
    return todo.save();
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: { name: object.name, description: object.description, done: object.done },
    });
  }
}

module.exports = new Todo(TodoModel);
