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

      xhr.onload = () => { // XMLHttpRequest.DONE 상태일때 onload가 호출된다.
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.status));
        }
      };
    });
  };
  return {
    get(url) {
      return req('GET', url); // promise 객체를 리턴한다.
    },
    post(url, payload) {
      return req('POST', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    },
    put(url, payload) {
      return req('PUT', url, payload);
    }
  };
})();

// Events
window.onload = () => {
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  target.value = '';
};

$todos.onchange = ({ target }) => {
  const id = +target.parentNode.id;
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = +target.parentNode.id;
};

$completedAll.onclick = ({ target }) => {
  const allStatus = target.checked;

};

$clearCompleted.onclick = () => {
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($item => $item.classList.toggle('active', $item === target));

  category = target.id;
};