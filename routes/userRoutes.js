const express = require('express')
const { signup } = require('../controllers/userControllers')
const router = express.Router()

router.post('/signup', signup)

module.exports = router