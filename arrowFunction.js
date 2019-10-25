
(function () {
  const foo = () => () => console.log(this); // 상위 스코프는 상위 함수, 근데 거기(화살표함수)에도 this가 없으니 한번 더 스코프 체인처럼 올라간다.
  foo()();
}).call({ a: 1 }); // { a: 1 }

const foo = function () {
  return function () {
    console.log(this);
  }
}