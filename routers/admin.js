const express = require('express')
const Controller = require('../controllers/admin')
const router = express.Router()

router.get('/login', Controller.adminLogin)
router.post('/login', Controller.login)

router.get('/:adminId/home', Controller.adminHome)

router.get('/:adminId/add', Controller.formAddHero)
router.post('/:adminId/add', Controller.addHero)

router.get('/:adminId/:heroId/edit', Controller.formEditHero)
router.post('/:adminId/:heroId/edit', Controller.editHero)

router.get('/:adminId/:heroId/remove', Controller.remove)

router.get('/:id/logout', Controller.logout)

module.exports = router