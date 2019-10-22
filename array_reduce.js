// reduce로 최대 값구하기
const values = [1, 2, 3, 4, 5];

const max = values.reduce((pre, cur) => (pre > cur ? pre : cur), 0); // cur 을 pre로 리턴해서 다음 cur과 비교
console.log(max); // 5

// Math로 최대 값 구하기
const values = [1, 2, 3, 4, 5];

const max = Math.max(...values); // max는 가변인자함수라는 것을 알 수 있다.
// const max = Math.max(values); 숫자값만 받으므로 NaN을 출력

// const max = Math.max.apply(null, values); apply는 정적 메소드, this는 아무런 의미가 없기 때문에 null을 준다.
// 두번째 매개변수는 배열이다.

const min = Math.min(...values);

console.log(max); // 5
console.log(min); // 1


// 공부★★
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((pre, cur) => {
  // 첫번째 순회: pre => {}, cur => 'banana'
  // 빈 객체에 요소값을 프로퍼티 키로 추가하고 프로퍼티 값을 할당
  // 만약 프로퍼티 값이 undefined이면 0으로 초기화
  pre[cur] = (pre[cur] || 0) + 1; // 초기값 빈객체에 pre[cur] 프로퍼티 키와 값를 할당, 할당 전에 평가해서
  return pre;
}, {});

console.log(count); // { banana: 1, apple: 2, orange: 2 }