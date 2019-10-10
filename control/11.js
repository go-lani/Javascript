// 삼각형 출력하기 - pattern 1
// 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// 기대값
// *
// **
// ***
// ****
// *****

const line = 5;
let star = '';

// for (let i = 1; i <= line; i++) {
//   for (let j = 1; j <= line; j++) {
//     if (i >= j) star += '*';
//   }
//   star += '\n';
// }
// console.log(star);

// if문을 사용하지 않은 방법
for (let i = 0; i < line; i++) {
  for (let j = 0; j <= i; j++) {
    star += '*';
  }
  star += '\n';
}
console.log(star);