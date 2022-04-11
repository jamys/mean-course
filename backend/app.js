const express = require('express');
const bodyParser = require('body-parser');
const { title } = require('process');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/posts', (req, res, next)=>{
    const posts =[
        {
            id: 'asds1dqwes',
            title: 'First Server Post',
            content: 'This is coming from the server'
        },
        {
            id: 'asds1qwedsd',
            title: 'Second Server Post',
            content: 'This is coming from the server!'
        }
    ];

    res.status(200).json({
        message: 'Post Fetched successfully',
        posts: posts
    });
});

app.post('/api/posts', (req, res, next)=>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post Added successfully'
    })
});

module.exports = app;