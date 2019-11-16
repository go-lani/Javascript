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

const ajax = (() => {
  const req = (method, url, payload) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify(payload));

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error('Error', xhr.status));
        }
      };
    });
  };
  return {
    get(url) {
      return req('GET', url);
    },
    post(url, payload) {
      return req('POST', url, payload);
    },
    put(url, payload) {
      return req('PUT', url, payload);
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    }
  };
})();

const getTodo = () => {
  console.dir(ajax.get('/todos'));
  ajax.get('/todos')
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
};

const addTodo = content => {
  ajax.post('/todos', content)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
};

const removeTodo = id => {
  ajax.delete(`/todos/${id}`)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
};

const changeComplete = id => {
  ajax.patch(`/todos/${id}`)
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
};

const completeAll = completed => {
  ajax.patch('/todos', { completed })
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
};

const clearCompleted = () => {
  ajax.delete('/todos/completed')
    .then(_todos => todos = _todos)
    .then(render)
    .catch(error => console.error(error));
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
  const completed = target.checked;
  completeAll(completed);
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