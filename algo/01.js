// 짝수와 홀수
// evenOrOdd 함수는 정수 num을 매개변수로 받는다.
// num은 1이상의 정수이며, num이 음수인 경우는 없다.
// num이 짝수일 경우 ‘Even’을 반환하고 홀수인 경우 ‘Odd’를 반환하도록 evenOrOdd 함수를 완성하라.

// 단, if문을 사용한 답과 삼항 조건 연산자를 사용한 답 두가지를 제시하여야 한다.

// if문
function evenOrOdd(num) {
  if (num % 2)
    console.log('Odd');
  else
    console.log('Even');
  }

evenOrOdd(2); // Even
evenOrOdd(3); // Odd
evenOrOdd(1000); // Even

// 3항 연산자
function evenOrOdd(num) {
  num % 2 ? console.log('Odd') : console.log('Even');
}

evenOrOdd(2); // Even
evenOrOdd(105); // Odd
evenOrOdd(1000); // Even