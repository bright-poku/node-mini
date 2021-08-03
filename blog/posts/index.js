const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json()); //parse json requests

const posts = {};

// route
app.get('/posts', (req, res) => {
    res.send(posts);
});

// route
app.post('/posts', (req, res) => {
//    generate an id when a post is created
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title};

    // send success post creation and send back id
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('listening on 4000');
})