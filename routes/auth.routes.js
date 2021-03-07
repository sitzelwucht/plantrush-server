const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');



router.post('/signup', (req, res) => {
    const { email, password, password2 } = req.body
    
    if (!email || !password || !password2) {
        res.status(500).json({errorMsg: 'Please fill out all fields'});
        return;  
    }
    if (password !== password2) {
        res.status(500).json({errorMsg: 'Passwords do not match'})
    }

    const emailRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!emailRegex.test(email)) {
        res.status(500).json({ errorMsg: 'Email format incorrect'});
        return;  
    }

    let pwRegex = /(?=.*\d)(?=.*[a-z]).{6,}/
    if (!pwRegex.test(password)) {
      res.status(500).json({errorMsg: 'Password does not meet requirements'});
      return;  
    }


    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    UserModel.create({email, password: hash})
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        if (err.code === 11000) {
            res.status(500).json({
                errorMsg: 'email already registered',
                message: err
            })
        }
        else {
            res.status(500).json({
                errorMsg: 'something went wrong',
                message: err 
            })
        }
    })
})


router.post('/login', (req, res) => {
    const { email, password } = req.body
    UserModel.findOne({ email })
    .then(userData => {
        bcrypt.compare(password, userData.password)
        .then(isMatch => {
            if (isMatch) {
                userData.password = '***'
                req.session.loggedInUser = userData
                res.status(200).json(userData)
            }
            else {
                res.status(500).json({ errorMsg: 'Incorrect password'
                })
                return
                }
            }) 
        .catch(() => {
            res.status(500).json({errorMsg: 'Invalid email format'})
            return
        })
    })
    .catch(err => {
        res.status(500).json({
            errorMsg: 'email not registered',
        })
        return
    })

})


router.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(204).json({})
})



const isLoggedIn = (req, res, next) => {
    if (req.session.loggedInUser) {
        next()
    }
    else {
        res.status(401).json({
            message: 'Unauthorized',
            code: 401
        })
    }
}


router.get('/user', isLoggedIn, (req, res, next) => {
    res.status(200).json(req.session.loggedInUser)
})



module.exports = router