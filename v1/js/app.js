const $input = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
let todos = [];

function count() {
  return Math.max(0, ...todos.map(todo => todo.id)) + 1;
}

function render() {
  let html = '';

  todos.forEach(todo => {
    html += `
      <li id="${todo.id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-myId${todo.id}" ${todo.completed ? 'checked' : ''}>
        <label for="ck-myId${todo.id}">${todo.content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
  });

  $todos.innerHTML = html;
}

function getTodos() {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false }
  ];

  render();
}

$input.addEventListener('keyup', function (e) {
  if (e.keyCode !== 13) return;

  todos = [...todos, { id: count(), content: e.target.value, completed: false }];

  render();
});

// Event
window.onload = getTodos;