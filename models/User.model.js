const { Schema, model } = require('mongoose')


let UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
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
        ref: 'Plant'
    }
})


let UserModel = model('user', UserSchema)

module.exports = UserModel