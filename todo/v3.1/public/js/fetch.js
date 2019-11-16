let todos = [];
let category = 'all'; // 선택된 type의 상태 값, 'all' & 'active' & 'completed'

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completedAll = document.querySelector('#ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');

const todoCount = () => todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const render = () => {
  let html = '';

  const _todos = todos.filter(({ completed }) => category === 'all' ? true : (category === 'active' ? !completed : completed));

  _todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <button type="button" class="remove-todo far fa-times-circle"></button>
    </li>
    `;
  });

  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
};

const getTodo = () => {
  fetch('/todos')
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const addTodo = content => {
  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(content)
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const removeTodo = id => {
  fetch(`/todos/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const changeComplete = id => {
  fetch(`/todos/${id}`, {
    method: 'PATCH'
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const completeAll = status => {
  fetch('/todos', {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({ status })
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const clearCompleted = () => {
  fetch('/clearCompleted', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

// Events
window.onload = () => {
  getTodo();
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  target.value = '';

  addTodo({ id: todoCount(), content, completed: false });
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = target.parentNode.id;

  removeTodo(id);
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;

  changeComplete(id);
};


$completedAll.onclick = ({ target }) => {
  const status = target.checked;
  completeAll(status);
};

$clearCompleted.onclick = () => {
  clearCompleted();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($item => $item.classList.toggle('active', $item === target));

  category = target.id;

  getTodo();
};