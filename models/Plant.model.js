const{ Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let PlantSchema = new Schema({
    name: {
        type: String,
    },
    watering: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    light: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    description: String,
    image: String,
    added: {
        type: Date,
        default: Date.now
    }
})

let PlantModel = model('plant', PlantSchema)

module.exports = PlantModel