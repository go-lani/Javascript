// 비동기처리를 해서 상태를 가져온다.
const promise = new Promise((resolve, reject) => { //  Promise 생성자 함수에서 resolve와 reject 함수를 인수로 넘겨준다.
  // 콜백 내부에서 비동기 처리를 한다.
  // 성공했을때 resolve의 인수로 값, 실패했을때 reject의 인수로 값을 넘겨준다.
  const random = Math.floor(Math.random(100) * 10);
  setTimeout(() => {
    if (random >= 5) resolve(random); // 성공일때 resolve함수를 호출하는데 인수로 원하는 값(예. JSON.parse(...))을 넣어준다.
    else reject(new Error('Error'));
  });
});

// promise 객체는 then이라는 후속처리함수를 가지고 있다.
promise
  .then(res => console.log(res)) // 성공했을때(then) 인수로 resolve함수의 인수(x)가 넘어온다. promise를 리턴한다.
  .catch(err => console.log(err));

// console.log(typeof promise); object