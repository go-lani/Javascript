// 평균 구하기
// 배열을 인자로 전달받아 각 요소의 평균을 구하는 함수를 완성하라.

function average(array) {
  return array.reduce((pre, cur) => pre + cur, 0) / array.length;
}

console.log(average([5, 3, 4])); // 4