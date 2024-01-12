const express = require('express');
const { Todo } = require('./db');
const z = require('zod');
const { createTodo } = require('./types');
const { PORT } = require('./config/config');
const app = express();

app.use(express.json());

app.get('/todo', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    todos,
  });
});

app.post('/todo', (req, res) => {
  const createPayload = req.body;
  const parseTodo = createTodo.safeParse(createPayload);

  if (!parseTodo.success) {
    res.status(411).json({
      msg: 'Invalid inputs',
    });
    return;
  }

  Todo.create({
    title,
    description,
  });
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.find;
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(403).json({
      msg: 'Bad Request',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
