// 삼각형 출력하기 - pattern 2
// 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// 기대값
// *****
//  ****
//   ***
//    **
//     *

const line = 5;
let star = '';

// for (let i = 1; i <= line; i++) {
//   // 들여쓰기 영역
//   for (let e = 1; e < line; e++) {
//     if (i > e) star += ' ';
//   }

//   // 별찍기 영역
//   for (let j = 1; j <= line; j++) {
//     if (i <= j) star += '*';
//   }
//   star += '\n';
// }
// console.log(star);

for (let i = 0; i < line; i++) {
  // 별찍기 영역
  for (let j = 0; j < line; j++) {
    if (i > j) {
      star += ' ';
      continue;
    }
    star += '*';
  }
  star += '\n';
}
console.log(star);