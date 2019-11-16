const path = require('path');

module.exports = {
  // enntry file - 자바스크립트 실행 시 가장 먼저 실행되어야할 자바스크립트를 지정한다.(진입점)
  // 의존성을 체크한다.
  entry: ['@babel/polyfill', './src/js/main.js'], // babel polyfill과 main.js를 동시에 실행시켜라
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    // 플러그인이 사용하는 것
    rules: [
      {
        // src/js에 있는 모든 js 파일(/node_modules/를 제외한)을 babel-loader를 로딩하여 옵션값의 내용을 옵션으로 사용하여 동작 시키는 것
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};