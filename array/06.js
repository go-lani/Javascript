// 특정 요소의 프로퍼티 값 반전
// todos에서 대상 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라.
// hint) 기존 객체의 특정 프로퍼티를 변경/추가하여 새로운 객체를 생성하려면 Object.assign 또는 Spread 문법을 사용한다.

const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  const selectedTodo = todos.find(todo => todo.id === id);
  selectedTodo.completed = !selectedTodo.completed;
  Object.assign([], todos, selectedTodo);

  // Object.assign(todo, { completed: !completed });  todo를 {}안에 있는 내용과 merge(덮어쓴다) 한다.
  // map(todo => todo.id === id ? todo.completed = !todo.completed : todo) 조건에 부합하지 않는 객체는 그대로 넘긴다. 만약 todo.completed = !todo.completed를 true 조건에 넣어주게되면 true값이 리턴된다.
  // map(todo => todo.id === id ? { ...todo, completed : !todo.completed } : todo) 조건에 부합하지 않는 객체는 그대로 넘긴다. 만약 todo.completed = !todo.completed를 true 조건에 넣어주게되면 true값이 리턴된다.
}


toggleCompletedById(3);
console.log(todos);

// console.log(todos);
/* 기대값
[
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/