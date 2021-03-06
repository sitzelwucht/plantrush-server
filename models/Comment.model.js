const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let CommentSchema = new Schema({
    title: String,
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

let CommentModel = model('comment', CommentSchema)

module.exports = CommentModel