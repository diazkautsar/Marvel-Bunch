const express = require('express')
const userController = require('../controllers/user')
const checkLogin = require('../middlewares/checklogin')
const checkRegister = require('../middlewares/checkRegister')
const router = express.Router()


router.get('/register', checkRegister, userController.formRegister)
router.post('/register', userController.register)

router.get('/login', userController.formLogin)
router.post('/login', userController.login)

router.get('/:id', checkLogin, userController.findOne)

router.get('/:id/play', checkLogin, userController.playingMe)
router.post('/:id/play', userController.findHero)

router.get('/:id/list', userController.getAll)

router.get('/:idUser/:idUserHero/remove', userController.removeHero)

router.get('/:id/logout', userController.logout)





module.exports = router