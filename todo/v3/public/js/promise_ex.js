const p = new Promise((resolve, reject) => {
  resolve(1);
});

console.dir(p);

// 결과를 인수로 받아 후속처리를 진행한다.
// then 메소드는 암묵적으로 promise를 리턴한다. 한마디로 new Promise와 같은 기능을 한다 즉, 하나의 새로운 promise로 생각해도된다..
// promise는 콜백함수의 리턴 값을 resolve한다.
// 기존 promise와 별개로 새로운 promise를 리턴하는 것이다.
p.then(num => ++num)
  .then(num => ++num)
  .then(num => ++num)
  .then(num => console.log(num));