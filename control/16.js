// 삼각형 출력하기 - pattern 5
// 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// 기대값
// *********
//  *******
//   *****
//    ***
//     *

const line = 5;
let star = '';

for (let i = 1; i <= line; i++) {
  // 들여쓰기 영역
  for (let e = line; e > 0; e--) {
    if (i > e) star += ' ';
  }

  // 별찍기 영역
  for (let j = 1; j <= line; j++) {
    if (i <= j) star += '*';
  }

  // 별 덧 붙이는 영역
  for (let k = 1; k <= line; k++) {
    if (i < k) star += '*';
  }
  star += '\n';
}
console.log(star);