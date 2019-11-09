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

const render = data => {
  todos = data;

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
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/todos');
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

const addTodo = data => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/todos');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

const removeTodo = id => {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', `/todos/${id}`);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

const changeState = id => {
  const xhr = new XMLHttpRequest();

  xhr.open('PATCH', `/todos/${id}`);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

const todoCount = () => todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const completedAll = allStatus => {
  const xhr = new XMLHttpRequest();

  xhr.open('PUT', '/todos');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(allStatus));

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

const clearCompleted = () => {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', '/completedTodo');
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      render(JSON.parse(xhr.response));
    } else {
      throw new Error(xhr.status);
    }
  };
};

// Events
window.onload = () => {
  getTodo();
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  addTodo({ id: todoCount(), content, completed: false });
  target.value = '';
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  changeState(id);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = +target.parentNode.id;
  removeTodo(id);
};

$completedAll.onclick = ({ target }) => {
  const allStatus = target.checked;

  completedAll({ allStatus });
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