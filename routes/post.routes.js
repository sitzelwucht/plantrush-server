const express = require('express')
const router = express.Router()
const PostModel = require('../models/Post.model')
const CommentModel = require('../models/Comment.model')


router.get('/myposts', (req, res) => {
    PostModel.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                error: 'something went wrong when getting posts',
                message: err
            })
        })
})


router.post('/create-post', (req, res) => {

    const { title, content, imageurl, author, authorName } = req.body
  
    let newPost = {
        title, 
        content,
        imageurl,
        author,
        authorName
    }

    PostModel.create(newPost)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: 'A problem occurred while creating post',
                message: err
            })
        })
})



router.get('/myposts/:postId', (req, res) => {

    PostModel.findById(req.params.postId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'A problem occurred while getting post',
            message: err
        })
    })
})


router.delete('/myposts/:id', (req, res) => {
    PostModel.findByIdAndDelete(req.params.id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred while deleting post',
            message: err
        })
    })
})


router.patch('/myposts/:id', (req, res) => {
    let id = req.params.id
    const { title, content, image } = req.body
    PostModel.findByIdAndUpdate(id, {$set: {title: title, content: content, image: image}}, {new: true})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred while updating post',
            message: err
        })
    })
})


router.get('/all-posts', (req, res) => {
    PostModel.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            error: 'something went wrong when getting posts',
            message: err
        })
    })
})



router.post('/add-comment', (req, res) => {

    const { title, content, author, post, authorName } = req.body
  
    let newComment = {
        title, 
        content,
        author,
        authorName,
        post
    }

    CommentModel.create(newComment)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: 'A problem occurred while adding comment',
                message: err
            })
        })
})


router.get('/comments/:id', (req, res) => {
    let postid = req.params.id
    CommentModel.find({ post: postid })
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(500).json({
                error: 'something went wrong when getting comments',
                message: err
            })
        })
})

module.exports = router