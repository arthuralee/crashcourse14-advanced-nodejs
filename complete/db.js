var express = require('express');
var bodyParser = require('body-parser');

// database connection
var userCollection;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/arthurle', function(err, db) {
  if (err) {
    console.log('Error connecting to database');
    return;
  }
  userCollection = db.collection('users');
  Db = db;
});

// initialize express
var app = express();
app.use(bodyParser.json());


app.get('/users', function(req, res) {
  userCollection.find().toArray(function(err, users) {
    if (err) {
      return res.status(500).send('db error');
    } else {
      return res.send(users);
    }
  });
});

app.get('/users/:id', function(req, res) {
  userCollection.findOne({id:req.params.id}, function(err, user) {
    if (err) {
      return res.status(500).send('db error');
    } else if (!user) {
      return res.status(404).send('User not found');
    } else {
      return res.send(user);
    }
  });
});

app.post('/users', function(req, res) {
  userCollection.insert(req.body, function(err, result) {
    if (err) {
      return res.status(500).send('db error');
    } else {
      return res.send(result);
    }
  });
});

app.put('/users/:id', function(req, res) {
  userCollection.update({id:req.params.id}, {$set: req.body}, function(err, result) {
    if (err) {
      return res.status(500).send('db error');
    } else {
      return res.send('Success');
    }
  });
});

app.all('*', function(req, res) {
  return res.status(400).send('Not supported');
});

// Bind the server to listen on port 8081
app.listen(8081);