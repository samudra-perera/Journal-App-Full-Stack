const express = require('express')
const { signup, login, verifyToken, getUser } = require('../controllers/userControllers')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', verifyToken, getUser)
//Verify Token
module.exports = router