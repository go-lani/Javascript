class Person {
  // 클래스 바디(메소드만 올 수 있다.)
  // 객체 리터럴와 다르게 콤마가 없어야된다.

  // 생성자 함수
  // 메소드가 따로 있기 때문에 프로퍼티 정의를 하는 곳이다.
  // 인스턴스 프로퍼티에 있다.
  constructor() {
    this.name = 'Lee';
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi ${this.name}`);
  }

  // 정적 메소드
  static foo() {

  }
}

const me = new Person();


// function Person() {
//   // new로 선언되면 여기에 빈 객체를 만들고, this를 바인딩한다.
//   this.name = 'Lee'; // 바인딩된 this의 name
// }

// Person.prototype.sayHi = function () {
//   console.log(`Hi ${this.name}`);
// }

// // 함수지만 객체이기에 프로퍼티를 가질 수 있다. (생성자함수의 정적 메소드를 추가하는 법)
// Person.foo = function () {

// }