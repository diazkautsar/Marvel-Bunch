const express = require('express')
const userRouter = require('./user')
const adminRouter = require('./admin')
const router = express.Router()

router.get('/', function(req, res){
    res.render('home.ejs')
})

router.use('/users', userRouter)
router.use('/admins', adminRouter)


module.exports = router