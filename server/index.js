const express = require('express');
const z = require('zod');
const { Todo } = require('./db');
const { createTodo, updateTodo } = require('./types');
const { PORT } = require('./config/config');
const app = express();

app.use(express.json());

app.get('/todo', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    todos,
  });
});

app.post('/todo', async (req, res) => {
  const createPayload = req.body;
  const parseTodo = createTodo.safeParse(createPayload);

  if (!parseTodo.success) {
    res.status(411).json({
      msg: 'Invalid inputs',
    });
    return;
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
  });

  res.status(200).json({
    msg: 'Todo created successfully',
  });
});

app.put('/todo/:id', async (req, res) => {
  const id = req.params.id;
  const parseId = updateTodo.safeParse(id);
  if (!parseId.success) {
    res.status(403).json({
      msg: 'Id of Todo is incorrect',
    });
    return;
  }
  await Todo.findByIdAndUpdate(id, { done: true });

  res.status(200).json({
    msg: 'Marked Todo as done',
  });
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
