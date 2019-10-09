// while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
// 기대값 0, 2, 4, 6, 8

// type1. 할당연산자를 사용하는 방법
var num = 0;

while (num < 10) {
  console.log(num);
  num += 2;
}

console.log('------------------------');

// type2. if문을 사용하는 방법
num = 0;

while (num < 10) {
  if (num % 2 === 0) console.log(num);
  num++;
}