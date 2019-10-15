const person = {
  firstName: 'Cheol-hwan',
  lastName: 'Lee',
  get fullName() { // get은 참조, 접근자 프로퍼티의 이름이다. 메소드처럼 쓰면안되고 프로퍼티처럼 써야된다. 인수가 없어야되고 리턴문이 있어야 된다.
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(firstName) { // <- set 인수가 있어야되고 리턴문이 없어야된다.
    this.firstName = firstName;
  }
  // getFullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // } // 일반적인 firstName과 lastName을 합침
};

// get은 참조,set은 할당할때
person.fullName = 'XXXX'; // setter가 실행
console.log(person.fullName); // <- getter가 실행 참조할때 fullName이란 프로퍼티키를 가지고 객체에 가서 프로퍼티 타입을 체크한다. 프로퍼티의 내용이 틀린 거로 찾는다(value의 여부), 데이터 프로퍼티라면 값을 리턴해준다.

console.log(Object.getOwnPropertyDescriptors(person));

// getOwnPropertyDescriptor의 출력 값
// XXXX Lee
// {
//   firstName: {
//     value: 'XXXX',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   lastName: {
//     value: 'Lee',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   fullName: {
//     get: [Function: get fullName],
//     set: [Function: set fullName],
//     enumerable: true,
//     configurable: true
//   }
// }