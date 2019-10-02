const http = require('http');

http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-plain');
    response.end('Hello nodeJS World');
}).listen(3000);

console.log('Server runnig at http://127.0.0.0:3000/');