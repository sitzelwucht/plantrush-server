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


// fetch plants with search string from ext API
router.get('/plant-search', (req, res) => {
    let queryStr = req.query.input
    axios.get(`https://trefle.io/api/v1/plants/search?token=${process.env.REACT_APP_TREFLE_API_KEY}&q=${queryStr}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => console.log(err))

})


// fetch detailed information about a specific plant
//TODO finish this
router.get('/detailed-search/:plant', (req, res) => {
    let queryStr = req.params.plant

    axios.get(`https://trefle.io/api/v1/species/${queryStr}?token=${process.env.REACT_APP_TREFLE_API_KEY}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => console.log(err))
})



router.post('/add-plant', (req, res) => {
    const { name, watering, light, description, scientific_name, added_by, imageurl } = req.body
    PlantModel.create({ 
        name: name, 
        scientific_name: scientific_name,
        description: description, 
        watering: watering, 
        light: light, 
        imageurl: imageurl,
        added_by: added_by
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