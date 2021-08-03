const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentsId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // get post id from the commentsByPostId
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentsId, content: content});

    // assign comments back to postid or store it back to temp data
    commentsByPostId[req.params.id] = comments;
    // send entire array of comments
    res.status(200).send(comments);
});

app.listen(4001, () => {
    console.log('listening on 4001');
})