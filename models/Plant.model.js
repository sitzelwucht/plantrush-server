const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let PlantSchema = new Schema({
    name: {
        type: String,
    },
    scientific_name: String,
    watering: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    light: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    description: String,
    imageurl: String,
    added: {
        type: Date,
        default: Date.now
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

let PlantModel = model('plant', PlantSchema)

module.exports = PlantModel