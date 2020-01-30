const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()


router.get('/register', userController.formRegister)
router.get('/login', userController.formLogin)

router.get('/:id', userController.findOne)

router.get('/:id/play', userController.playingMe)

module.exports = router