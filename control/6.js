// while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
// 기대값 9,7,5,3,1

// type1. 할당연산자를 사용하는 방법
let num = 9;

while (num > 0) {
  console.log(num);
  num -= 2;
}

console.log('------------------------');

// type2. if문을 사용하는 방법
num = 10;

while (num > 0) {
  if (num % 2 === 1) console.log(num);
  num--;
}