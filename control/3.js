// for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
// 기대값 02468

var result = '';

// type.1 증감식을 할당연산자 +=를 사용하여 적용
for (var i = 0; i < 10; i += 2) {
  result += i;
}
console.log(result);

console.log('------------------------');

result = '';

// type.2 if문을 이용하여 적용
for (var j = 0; j < 10; j++) {
  if (j % 2 === 0) result += j;
}
console.log(result);