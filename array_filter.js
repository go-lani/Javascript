let todos = [
  { id: 1, content: 'html', completed: false },
  { id: 2, content: 'css', completed: true },
  { id: 3, content: 'javascript', completed: false }
];

let a = todos.filter(todo => !todo.completed);
// let a = todos.filter(todo => todo.completed === false);

console.log(a);

// true요소의 개수를 구하라
// let b = a.reduce((pre, cur) => pre + cur, 0);
// console.log(b);

console.log(todos.filter(todo => todo.completed).length);