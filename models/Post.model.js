const { Schema, model } = require('mongoose')


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
    created: {
        type: Date,
        default: Date.now
    }
})

let PostModel = model('plant', PostSchema)

module.exports = PostModel