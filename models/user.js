const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const todoSchema = new Schema({
  email: {
    type: String,
    required:true
  },
  password:{
    type: String,
  }
});

const Todo = mongoose.model('User', todoSchema);

module.exports = Todo;
