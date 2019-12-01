// 요일 구하기
// 2016년 1월 1일은 금요일이다. 2016년 a월 b일은 무슨 요일일까?
// 두 수 a, b를 입력받아 a월 b일이 무슨 요일인지 출력하는 getDayName 함수를 완성하라.
// 요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT를 출력한다.
// 예를 들어 a=5, b=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.

function getDayName(a, b) {
  const year = 2016;
  const dayArr = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

console.log(getDayName(9, 12)); // TUE