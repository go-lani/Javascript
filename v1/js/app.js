let todos = [];

// DOMs;
const $input = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $allCheck = document.querySelector('#ck-complete-all');
const $currentCount = document.querySelector('.active-todos');
const $completedCount = document.querySelector('.completed-todos');
const $clearCompleted = document.querySelector('.clear-completed .btn');

function count() {
  return Math.max(0, ...todos.map(todo => todo.id)) + 1;
}

function render() {
  let html = '';

  todos = todos.sort(function (a, b) { return b.id - a.id });

  todos.forEach(todo => {
    html += `
      <li id="${todo.id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${todo.id}" ${todo.completed ? 'checked' : ''}>
        <label for="ck-${todo.id}">${todo.content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
  });

  $todos.innerHTML = html;
  $currentCount.textContent = todos.filter(todo => !todo.completed).length;
  $completedCount.textContent = todos.filter(todo => todo.completed).length;
}

function getTodos() {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false }
  ];
}

function removeTodo(e) {
  if (!e.target.classList.contains('remove-todo')) return;

  todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);

  render();
}

function addTodos(e) {
  if (e.keyCode !== 13 || $input.value.trim() === '') return;

  todos = [...todos, { id: count(), content: e.target.value, completed: false }];
  $input.value = '';
  render();
}

function changeCompleted(e) {
  todos = todos.map(todo => todo.id === +e.target.parentNode.id ? { ...todo, completed: !todo.completed } : todo);
  $completedCount.innerHTML = todos.filter(todo => todo.completed).length;
}

function allComplete() {
  todos = todos.map(todo => ({ ...todo, completed: todo.completed ? false : true }));

  render();
}

function removeComplete() {
  todos = todos.filter(todo => !todo.completed);

  render();
}

// Event
window.onload = () => {
  getTodos();
  render();
};
$todos.onclick = removeTodo;
$input.onkeyup = addTodos;
$todos.onchange = changeCompleted;
$allCheck.onclick = allComplete;
$clearCompleted.onclick = removeComplete;