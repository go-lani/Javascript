// 배열에서 특정 값만을 구하기
// 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라

function getArray(arr) {
  const newArr = arr.filter(num => !(num % 2) && num > 3 ? num : false);
  return newArr;
}

console.log(getArray([1, 2, 3, 4, 5, 6])); // [ 4, 6 ]