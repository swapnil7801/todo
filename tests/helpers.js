const mongoose = require('mongoose');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/todo_test';

module.exports.setupTest = () => mongoose.connect(url);

module.exports.clearDb = collection => mongoose.connect(url).then(() => collection.remove({}));
