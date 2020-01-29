const TodoModel = require('../models/todo');

class Todo {
  constructor(Model) {
    this.Model = Model;
  }

  create(name, desc, userId) {
    const newTodo = {
      name,
      description: desc,
      userId,
      done: false,
    };
    const todo = new this.Model(newTodo);
    return todo.save();
  }

  findAll() {
    return this.Model.find();
  }

  findById(id) {
    return this.Model.findById(id);
  }

  deleteById(id) {
    return this.Model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.Model.findOneAndUpdate(query, {
      $set: { name: object.name, description: object.description, done: object.done },
    });
  }
}

module.exports = new Todo(TodoModel);
