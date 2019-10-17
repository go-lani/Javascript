function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
console.log(me.toString());
console.log(me.__proto__); // 부모의 객체를 가리킨다. 비어 있지 않고 constructer를 가지고 있다.

// prototype 위에 Object.prototype 위에 null이 있다
// 인스턴스는 프로토타입에 상속 받는다 (실질적으로 생성한 생성자 함수가 아니다)
// 프로토타입 체인은 단반향 체인이다. 부모로 부터 상속만 받는다
// 프로토타입 체인의 존재 이유는 프로퍼티를 찾기위해서, 스코프체인은 식별자를 찾기 위해서
// me.toString() 에서 me는 식별자로서 스코프체인에서 찾고, toString()은 프로토타입 체인을 통해서 프로퍼티키를 찾는다


// 생성자 함수
function Circle(radius) {
  // console.log(this);
  // 생성자함수 실행 전 자바스크립트엔진이 빈 객체를 this에 바인딩 해준다.
  // 여기서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea());
// 1. 식별자(circle1)를 스코프 체인으로 먼저 찾는다.
// 2. circle1의 프로토타입 체인을 찾는다.
// 3. circle1에 프로퍼티로 getArea이 있는지 찾는다.
// 4. circle1에 없을 시 __proto__(접근자 프로퍼티)를 통해 prototype에 접근한다. circle1.__proto__; 는 circle의 프로토타입을 가져온다.
// 5. 참조(getter)로 원하는 값을 가져온다.


// 만약 생성자 함수를 찾으러 갈떄는
console.log(circle1.constructor);

// 생성자함수에서 프로토타입 참조
console.log(Circle.prototype);
// 같은 프로토 타입을 가리킨다.
console.log(Circle.prototype === circle1.__proto__)

// __proto__는 Object.prototype에 상속되어 있다.


// 프로토타입 체인이란?
// 상속 관계에서 프로퍼티를 탐색하는 메커니즘이다.


// 접근자 프로퍼티 __proto__
// __proto__ 대신 Object.getPrototypeOf(circle1);
// __proto__ 를 사용 자제 하고 Object.getPrototypeOf(인스턴스), Object.setPrototypeOf(인스턴스)를 권장.
console.log(Object.getPrototypeOf(circle1) === Circle.prototype);


// person이라는 애의 프로토타입을 알고 싶다.
const person = { name: 'Lee' };
console.log(Object.getPrototypeOf(person) === Object.prototype); // Object라는 생성자함수가 객체리터럴을 만들었다는 증거.
// Object.getPrototypeOf는 정적 함수를 호출한 것.


// 추상연산
// 함수는 createFunction으로 생성

// 객체 리터럴은 Object 생성자 함수로 만든 것으로 볼 수 있다.
// 객체 생성시 createObject 빈 객체를 만들고 프로퍼티디스크립터를 이용해서 프로퍼티를 추가한다.




