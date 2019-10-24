const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// 함수 outer를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 함수 outer의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop된다.
const innerFunc = outer(); // ③ outer는 죽고 inner는 살아 있다. innerFuncs는 전역에 선언적 환경 레코드에 저장된다.[[Environment]]]에 outer함수 렉시컬 환경을 넣어둔다.
innerFunc(); // ④ 10


// ↑ 그림으로 표현해보기



const $counter = document.querySelector('.counter');

const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let num = 0;

  // 클로저를 메소드로 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메소드들의 상위 스코프는 즉시 실행 함수의 스코프이다.
  return { // 리턴하기 직전에 평가한다. 이때 메소드들이 만들어 진다. 이때 상위 스코프는 즉시실행함수의 렉시컬 환경, 두개에 메소드가 하나의 렉시컬 환경을 참조하기 때문에 누적 변경이 된다.
    // num: 0, // 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
    increase() {
      $counter.textContent = ++num; // 상태 변경
    },
    decrease() {
      if (num <= 0) return;
      $counter.textContent = --num; // 상태 변경
    }
  };
}());