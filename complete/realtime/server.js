var express = require("express");

// initialize express
var app = express();

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

// Bind the server to listen on port 8081
var server = app.listen(8081);
var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
  socket.on("msg", function (data) {
    io.sockets.emit("new", data);
  });
});