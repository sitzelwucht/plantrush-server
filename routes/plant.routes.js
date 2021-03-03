const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const PlantModel = require('../models/Plant.model')




module.exports = router