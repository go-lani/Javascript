let todos = [];
let temp = [];
let type = 'all'; // 선택된 type의 상태 값, 'all' & 'active' & 'completed'

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completedAll = document.querySelector('#ck-complete-all');
const $clearCompleted = document.querySelector('.clear-completed');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');

// Func
const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javasript', completed: false },
  ];

  todos.sort((todoA, todoB) => todoB.id - todoA.id);
};

// const separateTodo = (view) => {
//   switch (view) {
//     case 'all':
//       break;

//     case 'active':
//       todos = [...todos].filter(todo => !todo.completed);
//       break;

//     case 'completed':
//       todos = [...todos].filter(todo => todo.completed);
//       break;

//     default:
//       break;
//   }
//   return todos;
// };

const render = () => {
  // temp = todos;
  let html = '';

  // todos = separateTodo(type);
  const _todos = todos.filter(({ completed }) => type === 'all' ? true : (type === 'active' ? !completed : completed))

  _todos.forEach(({ id, content, completed }) => {
    html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
    `;
  });


  $todos.innerHTML = html;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  // todos = temp;
};


const findId = () => Math.max(0, ...todos.map(todo => todo.id)) + 1;

const addTodo = content => {
  todos = [{ id: findId(), content, completed: false }, ...todos];
};

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== id);
};

const changeComplete = id => {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
};

const changeAll = completed => {
  todos = todos.map(todo => ({ ...todo, completed }));
};

const clearCompletedAll = () => {
  todos = todos.filter(todo => !todo.completed);
};

// Events
window.onload = () => {
  getTodos();
  render();
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();

  if (content === '' || keyCode !== 13) return;

  target.value = '';
  addTodo(content);
  render();
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;

  removeTodo(+target.parentNode.id);
  render();
};

$todos.onchange = ({ target }) => {
  changeComplete(+target.parentNode.id);
  render();
};

$completedAll.onchange = ({ target }) => {
  changeAll(target.checked);
  render();
};

$clearCompleted.onclick = () => {
  clearCompletedAll();
  render();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;

  [...$nav.children].forEach($navItem => {
    // if ($navItem === target) $navItem.classList.add('active')
    // else $navItem.classList.remove('active');
    $navItem.classList.toggle('active', $navItem === target); // toggle 조건이 맞으면 붙이고 없으면 띄우고
  });

  type = target.id;
  render();
};