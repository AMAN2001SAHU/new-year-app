const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/config');

mongoose.connect(MONGO_URL);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = { Todo: Todo };
