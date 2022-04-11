const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  title
} = require('process');

const Post = require('./models/post');
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


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: 'Post Fetched successfully',
      posts: posts
    });
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save().then(
    (result) => {
      res.status(201).json({
        message: 'Post Added successfully',
        postId: result._id,
      })
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted'
    });
  });

});

module.exports = app;
