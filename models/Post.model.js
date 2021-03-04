const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')


let PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
})

let PostModel = model('post', PostSchema)

module.exports = PostModel