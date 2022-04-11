const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const {
  title
} = require('process');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/posts-app')
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('connected failed', err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/images', express.static(path.join('backend/images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.use('/api/posts', postsRoutes);

module.exports = app;
