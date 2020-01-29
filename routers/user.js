const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()


router.get('/register', userController.formRegister)
router.get('/login', userController.formLogin)


module.exports = router