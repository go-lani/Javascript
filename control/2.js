// for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
// 기대값 0, 2, 4, 6, 8

// type.1 증감식을 변경하여 적용
for (let i = 0; i < 10; i += 2) {
  console.log(i);
}

console.log('------------------------');

// type.2 if문을 활용하여 적용
for (let j = 0; j < 10; j++) {
  if (j % 2 === 0) console.log(j);
}