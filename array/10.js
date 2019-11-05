// 배열의 최대/최소값 구하기
// 배열의 요소 중 최대값/최소값을 반환하는 함수를 완성하라.
function getMaxValueFromArray(array) {
  const max = Math.max(...array);
  return max;
}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  const min = Math.min(...array);
  return min;
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5