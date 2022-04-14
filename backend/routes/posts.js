const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

const MIME_TYPE_MAP = {
  'iamge/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MimeType');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.find().then((posts) => {
    fetchedPosts = posts;
    return Post.count();
  })
    .then(count => {
      res.status(200).json({
        message: 'Post Fetched successfully',
        posts: fetchedPosts,
        maxPosts: count

      });
    }).catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      });
    });
});

router.post('', checkAuth,
  multer({
    storage: storage
  }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.userData.userId
    });

    post.save().then(
      (result) => {
        res.status(201).json({
          message: 'Post Added successfully',
          post: {
            id: result._id,
            title: result.title,
            content: result.content,
            imagePath: result.imagePath
          }
        })
      }).catch(error => {
        res.status(500).json({
          message: 'Creating a post failed!'
        });
      });
  });

router.put('/:id', checkAuth,
  multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId
    });

    Post.updateOne({
      _id: req.params.id,
      creator: req.userData.userId
    }, post).then(result => {

      if (result.modifiedCount > 0) {

        res.status(200).json({
          message: "Update successful"
        });
      } else {
        res.status(401).json({
          message: "Not authorized"
        });
      }

    }).catch(error => {
      res.status(500).json({
        message: "Couldn't update post!"
      })
    });
  });

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    })
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  }).then((result) => {

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "Deletion successful"
      });
    } else {
      res.status(401).json({
        message: "Not authorized"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Delete post failed!"
    })
  });

});


module.exports = router;
