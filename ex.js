var result; // 변수 선언
console.log(result);
result = 100; // 변수 할당

console.log(result);

// 선언과 동시에 할당
var result = 100;

console.log(result);

// 호이스팅
console.log(hoisting); // 선언문만 먼저 실행하기 때문에 할당한 값이 안나온다. 할당문은 런타임때 실행된다.

var hoisting = 100;

console.log(hoisting); // 런타임 환경을 따지면 위에 hositin 변수에 100의 값을 할당하는 것을 먼저 읽고 그 다음에 참조하기에 값이 제대로 나온다


var x = 1;
var y = 2;
var z = y;

y = x;
x = z;

console.log(x, y);


// if문과 삼항연산자를 비교

var x = 2;
var result;

x % 2 ? result = '홀수' : result = '짝수';

console.log(result);

// 삼항연산자는 표현식인 문으로 값으로 평가할 수 있기 때문에 더 간결하게 쓸 수 있다.
result = x % 2 ? '홀수' : '짝수';

console.log(result);


for (var i = 1; i <= 10; i++) {
  // 홀수
  if (i % 2) console.log(i);

  // 2와 3의 배수
  if (i % 3 === 0 && i % 2 === 0) console.log(i);
}

for (var i = 10; i > 0; i--) {
  // 10부터 1까지
  console.log(i);

  // 10부터 1까지 중 짝수만
  if (i % 2 === 0) console.log(i);
}