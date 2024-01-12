const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/config');

mongoose.connect(MONGO_URL);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = { Todo: Todo };
