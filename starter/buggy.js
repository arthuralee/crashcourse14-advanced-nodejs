var http = require('http');

var server = http.createServer(function (req, res) {
  if (Math.random() < 0.05) throw('I quit');
  res.end('Hello World!');
});

server.listen(8888);