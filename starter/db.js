var express = require('express');
var bodyParser = require('body-parser');

// initialize express
var app = express();
app.use(bodyParser.json());

var users = [
  {
    id: 99,
    name: 'Arthur',
    email: 'arthur@arthurlee.me'
  },
  {
    id: 201,
    name: 'John',
    email: 'john@example.com'
  }
];


app.get('/users', function(req, res) {
  return res.send(users);
});

app.get('/users/:id', function(req, res) {
  for (var i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) {
      return res.send(users[i]);
    }
  }
  return res.status(404).send('User not found');
});

app.post('/users', function(req, res) {
  users.push(req.body);
  return res.send(users[users.length-1]);
});

app.put('/users/:id', function(req, res) {
  for (var i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) {
      if (req.body.name) users[i].name = req.body.name;
      if (req.body.email) users[i].email = req.body.email;
      return res.send(users[i]);
    }
  }
  return res.status(404).send('User not found');
});

app.all('*', function(req, res) {
  return res.status(400).send('Not supported');
});

// Bind the server to listen on port 8081
app.listen(8081);