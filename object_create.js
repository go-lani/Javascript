// Object.create(프로토타입) - 인수로 넘겨준 객체를 프로토타입과 연결하여 만드는 것, 동적으로 프로토타입을 만들면서 제작하는 것
const o = Object.create({ x: 1 }); // 프로토타입이 { x: 1 }이 된다.
// o => x:1 => Object.prototype => null

console.log(o.x); // 1
console.log(o.__proto__); // { x: 1 }

