// 숫자를 문자로 변환하여 console 자동개행 없애기
var result = ''; // undefined + number는 NaN 이기 때문에 문자열로 바꿔주기 위해 빈문자열을 더해준다 '' += i 자동 타입변환

for (var i = 1; i <= 3; i++) {
  result += i; // undefined + number는 NaN
}
console.log(result);


// 이중 for문 변환

// 5x5 정사각형
var star = '';

for (var i = 1; i <= 5; i++) {

  for (var j = 1; j <= 5; j++) {
    star += '*';
  } // 5개를 채운다

  star += '\n'; // 1라인을 정비 후 줄바꿈을 추가
}

console.log(star);