// 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.
// [ 1, 5 ], [ 2, 4 ], [ 3, 3 ], [ 4, 2 ], [ 5, 1 ]

let sum;

for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    if (i + j === 6) sum = j;
  }
  console.log(i, sum);
}