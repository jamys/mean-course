const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const PostController = require('../controllers/posts');

const router = express.Router();



router.get('', PostController.getAllPosts);

router.post('', checkAuth, extractFile, PostController.createPost);

router.put('/:id', checkAuth, extractFile, PostController.editPost);

router.get('/:id', PostController.getPost);

router.delete('/:id', checkAuth, PostController.deletePost);


module.exports = router;
