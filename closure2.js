// 왜 안되는지 찾기
function makeCounter(predicate) {
  let counter = 0;

  // 클로저를 반환
  return function () {
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2


/// 상위 스코프
for (let i = 0; i < 3; i++) { // let i로 인해
  arr[i] = () => i; // 함수의 상위 스코프는 for문이다.
}