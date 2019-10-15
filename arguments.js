function square(num) {
  console.log(arguments);
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  return num * num;
}

square(10, 20, 30);

// 가변인자 함수때문에 arguments 라는 매개변수를 만들었다.


// 유사배열객체를 배열로 받는 방법
function square(num) {
  console.log([...arguments]); // 스프레드 기법,
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  return num * num;
}

// arguments의 length는 인수의 개수, 함수의 length는 매개변수의 개수다.