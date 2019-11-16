let todos = [];

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completedAll = document.querySelector('#ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const getTodos = () => {
  // 서버로부터 todos를 취득
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false }
  ];
  // 이때 sort를 해야되면 render할 때가 아니라 취득할때 sort 시키는 것이 수월하다.
  todos.sort((todo1, todo2) => todo2.id - todo1.id);
};

const render = () => {
  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = content => {
  // { id: 100, content: content, completed: false }
  todos = [{ id: generateId(), content, completed: false }, ...todos]; // 축약
};

const toggleCompleted = id => { // 뭘 먼저 받아야될지 고민해서 작업하자.
  // id를 받을 수 있다는 가정하에 작업
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
};

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== id);
};

const completeAll = completed => { // completed는 all의 check 상태
  todos = todos.map(todo => ({ ...todo, completed }));
};

const removeCompletedAll = () => {
  todos = todos.filter(todo => !todo.completed);
};

// Events
window.onload = () => {
  getTodos();
  render();
};

$input.onkeyup = ({ target, keyCode }) => { // 디스트럭쳐링
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  target.value = '';
  addTodo(content);
  render();
};

$todos.onchange = ({ target }) => {
  toggleCompleted(+target.parentNode.id); // atrribute 값은 문자열이기 때문에 숫자로 변환해서
  render();
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  removeTodo(+target.parentNode.id);
  render();
};

$completedAll.onchange = ({ target }) => {
  completeAll(target.checked);
  render();
};

$clearCompleted.onclick = ({ target }) => {
  removeCompletedAll();
  render();
};

