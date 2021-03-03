const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

let CommentModel = model('plant', CommentSchema)

module.exports = CommentModel