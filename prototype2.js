
// 캡슐화
// 생명주기를 알아야된다.
// 스코프를 알아야된다.
// 언제 태어나고 언제 죽는지(참조할 수 없을때)


// 패턴 외우기
const Person = (function () {
  let _name = '';
  // 함수내부에 있기 때문에 함수스코프로 인해 지역변수를 만들어 변경이 불가능하게 한다.

  function Person(name) {
    _name = name; // 초기화 되어 _ name에 name을 할당해준다.
  }; // 즉시실행함수 실행할때 person이 바로 생긴다. 생김과 동시에 prototype 객체도 생긴다.

  Person.prototype.sayHi = function () {
    console.log(`Hi ${_name}.`);
  }; // 메소드는 자신이 바라보는 객체가 살아있으면 죽지 않는다.
  // 모든 함수는 자신이 생성될때 자신의 상위 스코프를 기억한다.
  // 렉시컬 스코프를 생각하면 선언됬을때 스코프환경에서 기억한다. 그래서 _name을 기억하는 것이다.

  // 리턴을 안하면 undefined

  return Person; // 리턴을 생성자함수로 리턴
  // 리턴하는 동시에 Person.prototype에 sayHi가 들어간다.
}()); // 즉시실행 함수로 만든다, 생성자 함수와 prototype을 하나의 캡슐로 묶어준다.
// Person 함수는 살아있다. const Person이 return으로 Person 함수를 할당 받아서 살아 있다. prototype도 살아있다.



const me = new Person('Lee');

me.sayHi(); // Hi Lee.
// prototype에 저장한 후 sayHi가 죽었기때문에 prototype에는 살아있다

console.log(_name);  //_name is not defined
// 지역변수이기 때문에 찾을 수 없다.