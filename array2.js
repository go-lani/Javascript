const Number = (function () {
  function Numbers() {
    this.numberArray = [];
  }

  Numbers.prototype.multiply = function (arr) {
    // 첫번째 방법 const that = this;
    arr.forEach(function (item) {
      // 외부에서 this를 전달하지 않으면 this는 전역 객체를 가리킨다
      this.numberArray.push(item * item);
    }, this); // 세번째 forEach는 2번째 인수에 this를 넣으면 바인딩 된다.
    // }.bind(this)); // 두번째 방법
  };

  return Numbers;
}());

const numbers = new Number();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray);