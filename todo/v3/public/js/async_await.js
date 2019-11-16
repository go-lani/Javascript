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

// await를 포함하는 함수에 async라는 키워드를 붙여줘야한다.
// 비동기함수(promise)에는 await을 붙여줘야한다.
// async,await은 axios라서 사용하는게 아니라 promise기반이면 가능하다.
// 비동기 함수를 동기처럼 사용할 수 있다.
const getTodos = async () => {
  // const res = await axios.get('/todos').then(res => todos = res.data).catch(err => console.error(err));

  // 위와 같다.
  try {
    const res = await axios.get('/todos');
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

const addTodo = async content => {
  try {
    const res = await axios.post('/todos', content);
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

const changeComplete = async id => {
  try {
    const res = await axios.patch(`/todos/${id}`);
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

const removeTodo = async id => {
  try {
    const res = await axios.delete(`/todos/${id}`);
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

const completedAll = async completed => {
  try {
    const res = await axios.patch('/todos', { completed });
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

const clearCompleted = async () => {
  try {
    const res = await axios.delete('/completedTodo');
    todos = res.data;
    render();
  } catch (e) {
    console.log(e);
  }
};

// Events
window.onload = () => {
  getTodos();
};


$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  addTodo({ id: todoCount(), content, completed: false });

  target.value = '';
};

$todos.onchange = ({ target }) => {
  const id = +target.parentNode.id;
  changeComplete(id);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  const id = +target.parentNode.id;

  removeTodo(id);
};

$completedAll.onclick = ({ target }) => {
  const status = target.checked;

  completedAll(status);
};

$clearCompleted.onclick = () => {
  clearCompleted();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($item => $item.classList.toggle('active', $item === target));

  category = target.id;

  getTodos();
};
