// 객체는 한번만 사용할거면 이렇게 해도 된다.
// const person = {
//   name: 'Lee',
//   sayHi() {
//     console.log(`Hi My name is ${person.name}.`);
//   }
// };
// person.sayHi();



// 일반함수 내부에서 this는 언제나 전역 객체(브라우저: window, nodejs: global)
// 객체리터럴의 메소드에서 this는 항상 자신(소속되어 있는 객체)을 가리킨다.
// 생성자함수 내부에서 this는 생성자함수가 생성할 인스턴스!!!를 가리킨다.
// 메소드로서 this는 메소드를 포함한 객체가 this이다.

function Person(name) { // 생성자함수의 함수이름은 일반적으로 파스칼케이스로 한다.
  console.log(this); // 프로퍼티 추가하기 전이니까 빈객체이다.
  this.name  = name; // <- *함수 내부이므로 : 가 아닌 =
  console.log(this); // 프로퍼티 추가 후
  this.sayHi = function () {
    console.log(`Hi My name is ${this.name}`);
  };

  console.log(this);
}

const me = new Person('Lee');
const you = new Person('kim');
// 1. 생성자함수로서 호출이 되면 function 선두에서 빈 객체를 만들고
// 2. 생성한 빈 객체를 this(인스턴스)에 할당한다.
// 3. 기술한 코드를 실행한다, this에 프로퍼티 추가한다.
// 4. return this(인스턴스)를 한다. 절대 개발자가 return문을 따로 주면 안된다.

console.log(me);
console.log(you);