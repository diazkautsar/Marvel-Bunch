const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()


router.get('/register', userController.formRegister)
router.post('/register', userController.register)

router.get('/login', userController.formLogin)
router.post('/login', userController.login)

router.get('/:id', userController.findOne)

router.get('/:id/play', userController.playingMe)
router.post('/:id/play', userController.findHero)

router.get('/:id/list', userController.getAll)

router.get('/:idUser/:idHero/remove', userController.removeHero)





module.exports = router