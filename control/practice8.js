// 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.
// 기대값 73

let result = 0;

for (let i = 1; i < 20; i++) {
  if (i % 2 && i % 3) { // 나머지가 있을때(true) result에 더해라, 나머지가 0 이면 false니까 pass
    result += i;
  }

}
console.log(result);