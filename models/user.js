const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
