// id 프로퍼티의 값 중에서 최대값 구하기
// todos의 id 프로퍼티의 값 중에서 최대값을 구하는 함수를 작성하라.
// 단, for 문, Array#forEach는 사용하지 않도록 하자.
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getMaxId() {
  return Math.max(...todos.map(todo => todo.id));
  // return Math.max.apply(null, todos.map(todo => todo.id));
}

console.log(getMaxId()); // 3