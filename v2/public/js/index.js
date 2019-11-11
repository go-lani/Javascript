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

      // xhr.onreadystatechange = () => {
      //   if (xhr.readyState !== XMLHttpRequest.DONE) return;

      //   if (xhr.status === 200) {
      //     resolve(JSON.parse(xhr.response));
      //   } else {
      //     reject(new Error(xhr.status));
      //   }
      // };

      xhr.onload = () => { // XMLHttpRequest.DONE 상태일때 onload가 호출된다.
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

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
  // ajax.get('/todos')
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  // fetch 사용(빌트인 함수이므로 안전하다)
  fetch('/todos') // promise를 리턴한다.
    .then(res => res.json()) // 상용구 (res라는 객체를 반환한다.), json을 받으려면 .json을 하면 fetch 함수 내부에서 파서해서 전달해준다. text 는 .text()
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  // ajax.post('/todos', { id: todoCount(), content, completed: false })
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  fetch('/todos', {
    method: 'POST',
    headers: { 'Content-type' : 'application/json' }, // key : value 형식으로 던져준다.
    body: JSON.stringify({ id: todoCount(), content, completed: false }) // payload
  })
    .then(res => res.json()) // 상용구 (res라는 객체를 반환한다.), json을 받으려면 .json을 하면 fetch 함수 내부에서 파서해서 전달해준다. text 는 .text()
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));

  target.value = '';
};

$todos.onchange = ({ target }) => {
  const id = +target.parentNode.id;

  // ajax.patch(`/todos/${id}`, { id })
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-type' : 'application/json' },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = +target.parentNode.id;

  // ajax.delete(`/todos/${id}`)
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  fetch(`/todos/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(res => todos = res) // 할당연산자는 할당한 값으로 평가되기때문에 res로 평가된다.
    .then(render) // 다음 프로미스는 res를 인수로 받는다.
    .catch(error => console.error(error));
};

$completedAll.onclick = ({ target }) => {
  const allStatus = target.checked;

  // ajax.put('/todos', { allStatus })
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));


  fetch('/todos', {
    method: 'PUT',
    headers: { 'Content-type' : 'application/json' },
    body: JSON.stringify({ allStatus })
  })
    .then(res => res.json())
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));
};

$clearCompleted.onclick = () => {
  // ajax.delete('/completedTodo')
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  fetch('/completedTodo', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($item => $item.classList.toggle('active', $item === target));

  category = target.id;

  // ajax.get('/todos')
  //   .then(res => todos = res)
  //   .then(render)
  //   .catch(error => console.error(error));

  fetch('/todos')
    .then(res => res.json())
    .then(res => todos = res)
    .then(render)
    .catch(error => console.error(error));
};