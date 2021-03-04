const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const PostModel = require('../models/Post.model')




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
    const { title, content, image } = req.body

    PostModel.create({ title: title, content: content, image: image })
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
    const { title, description, image } = req.body
    PostModel.findByIdAndUpdate(id, {$set: {title: title, description: description, image: image}}, {new: true})
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


module.exports = router