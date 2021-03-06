const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'plant'
    }
})


let UserModel = model('user', UserSchema)

module.exports = UserModel