// 평균 구하기
// 배열을 인자로 전달받아 각 요소의 평균을 구하는 함수를 완성하라.

function average(array) {
  const sum = array.reduce((pre, cur) => {
    return pre + cur;
  }, 0);

  return sum / array.length;
}

console.log(average([5, 3, 4])); // 4