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
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    time: {
        type: Date,
        default: Date.now
    }
})

let CommentModel = model('comment', CommentSchema)

module.exports = CommentModel