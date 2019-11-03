// 수박수박수박수박수박수?
// waterMelon 함수는 정수를 인수로 전달받는다.
// 길이가 n이고, 수박수박수…와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하라.
// 예를 들어 n이 4이면 ‘수박수박’을 리턴하고 3이라면 ‘수박수’를 리턴한다.

function waterMelon(n) {
  let str = '';

  for (let i = 0; i < n; i++) {
    i % 2 ? str += '박' : str += '수';
  }
  return str;
}

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));
console.log('n이 13인 경우: '+ waterMelon(11));
console.log('n이 50인 경우: '+ waterMelon(50));
console.log('n이 1000인 경우: '+ waterMelon(1000));