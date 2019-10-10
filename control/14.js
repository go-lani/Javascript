// 삼각형 출력하기 - pattern 4
// 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// 기대값
//     *
//    **
//   ***
//  ****
// *****

const line = 10;
let star = '';

// for (let i = 1; i <= line; i++) {
//   // 별찍기 영역
//   for (let j = line; j > 0; j--) {
//     if (i < j) {
//       star += ' ';
//       continue;
//     }
//     star += '*';
//   }
//   star += '\n';
// }
// console.log(star);

console.log('--------------------------------------');

// for (let i = 0; i < line; i++) {
//   // 별찍기 영역
//   for (let j = 0; j <= line; j++) {
//     if (j < line - i) {
//       star += ' ';
//       continue;
//     }
//     star += '*';
//   }
//   star += '\n';
// }
// console.log(star);

console.log('--------------------------------------');

for (let i = 0; i < line; i++) {
  for (let j = 0; j < (line - i) - 1; j++) {
    star += ' ';
  }
  for (let s = 0; s <= i * 1; s++) {
    star += '*';
  }
  star += '\n';
}
console.log(star);