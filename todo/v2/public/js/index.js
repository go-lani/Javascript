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

// 클로저 사용
const ajax = (() => {
  const req = (method, url, f, payload) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 200) {
        f(JSON.parse(xhr.response));
      } else {
        throw new Error(xhr.status);
      }
    };
  };
  return {
    get(url, f) {
      req('GET', url, f);
    },
    post(url, payload, f) {
      req('POST', url, f, payload);
    },
    delete(url, f) {
      req('DELETE', url, f);
    },
    patch(url, payload, f) {
      req('PATCH', url, f, payload);
    },
    put(url, payload, f) {
      req('PUT', url, f, payload);
    }
  };
})();

// 클로저 미사용
// const getTodo = () => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', '/todos');
//   xhr.send();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// const addTodo = data => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('POST', '/todos');
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.send(JSON.stringify(data));

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// const removeTodo = id => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('DELETE', `/todos/${id}`);
//   xhr.send();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// const changeState = id => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('PATCH', `/todos/${id}`);
//   xhr.send();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// const completedAll = allStatus => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('PUT', '/todos');
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.send(JSON.stringify(allStatus));

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// const clearCompleted = () => {
//   const xhr = new XMLHttpRequest();

//   xhr.open('DELETE', '/completedTodo');
//   xhr.send();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status === 200) {
//       render(JSON.parse(xhr.response));
//     } else {
//       throw new Error(xhr.status);
//     }
//   };
// };

// Events
window.onload = () => {
  ajax.get('todos', render);
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  ajax.post('/todos', { id: todoCount(), content, completed: false }, render);
  target.value = '';
};

$todos.onchange = ({ target }) => {
  const id = +target.parentNode.id;

  ajax.patch(`/todos/${id}`, { id }, render);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = +target.parentNode.id;
  ajax.delete(`/todos/${id}`, render);
};

$completedAll.onclick = ({ target }) => {
  const status = target.checked;

  ajax.put('/todos', { status }, render);
};

$clearCompleted.onclick = () => {
  ajax.delete('/clearCompleted', render);
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($item => $item.classList.toggle('active', $item === target));

  category = target.id;

  ajax.get('/todos', render);
};