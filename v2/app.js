const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javasript', completed: false }
];

todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  todos = [req.body, ...todos];
  res.send(todos);
});

app.put('/todos/:type', (req, res) => {
  console.log(req.params.type);
  const check = req.body.allStatus;

  if (req.params.type === 'check') {
    todos = todos.map(todo => ({ ...todo, completed: check }));
    res.send(todos);
  } else if (req.params.type === 'clear') {
    todos = todos.filter(todo => todo.completed === false);
    res.send(todos);
  }

});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;

  todos = todos.map(todo => todo.id === +id ? { ...todo, completed } : todo);
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});


app.listen(3000, () => console.log('Hello localhost:3000'));