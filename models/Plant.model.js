const { Schema, model } = require('mongoose')

let PlantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    watering: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    light: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    added: {
        type: Date,
        default: Date.now
    }
})

let PlantModel = model('plant', PlantSchema)

module.exports = PlantModel