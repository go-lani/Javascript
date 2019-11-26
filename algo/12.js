// 중복 요소 제거
// 인수로 전달된 배열의 요소 중에서 중복된 요소를 제외하고 유니크한 요소만을 반환하는 함수를 작성하라.

function uniq(array) {
  // reduce를 활용한 방법
  // let result = array.reduce((pre, cur, i, self) => {
  //   if (self.indexOf(cur) === i) pre.push(cur);

  //   return pre;
  // }, []);

  // return result;

  // for문을 활용한 방법
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (newArr.indexOf(array[i]) === -1) {
      newArr.push(array[i]);
    }
  }
  console.log(newArr);
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]