// 중복된 요소
// 인수로 전달된 배열의 요소 중에서 중복된 요소만으로 구성된 배열을 반환하는 함수를 작성하라.

function findDuplicated(array) {
  // reduce를 활용한 방법
  // let result = array.reduce((pre, cur, i, self) => {
  //   if (self.indexOf(cur) !== i) pre.push(cur);

  //   return pre;
  // }, []);

  // return result;

  // for문을 활용한 방법
  // const resultArr = [];
  // for (let i = 1; i < array.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     if (array[i] === array[j]) {
  //       resultArr.push(array[j]);
  //     }
  //   }
  // }
  // return resultArr;

  // filter와 indexOf를 활용한 방법
  return array.filter((cur, index) => array.indexOf(cur) !== index);
}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]