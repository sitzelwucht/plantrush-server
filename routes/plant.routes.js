const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const PlantModel = require('../models/Plant.model')
const axios = require('axios')



router.get('/myplants', (req, res) => {
    PlantModel.find()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({
                error: 'something went wrong when getting plants',
                message: err
            })
        })
})


router.get('/all-plants', (req, res) => {
    axios.get(`https://trefle.io/api/v1/plants?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => console.log(err))
})



router.post('/add-plant', (req, res) => {
    const { name, watering, light, description, sciName, addedBy, imageurl } = req.body
    PlantModel.create({ 
        name: name, 
        scientific_name: sciName,
        description: description, 
        watering: watering, 
        light: light, 
        imageurl: imageurl,
        added_by: addedBy
    })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: 'A problem occurred while adding plant',
                message: err
            })
        })
})


router.get('/myplants/:plantId', (req, res) => {

    PlantModel.findById(req.params.plantId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'A problem occurred while getting plant',
            message: err
        })
    })
})


router.delete('/myplants/:id', (req, res) => {
    PlantModel.findByIdAndDelete(req.params.id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred while deleting plant',
            message: err
        })
    })
})


router.patch('/myplants/:id', (req, res) => {
    let id = req.params.id
    const { name, watering, light, description, image } = req.body
    PlantModel.findByIdAndUpdate(id, {$set: {name: name, description: description, watering: watering, light: light, image: image}}, {new: true})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred while updating plant',
            message: err
        })
    })
})


module.exports = router