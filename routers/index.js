const express = require('express')
const userRouter = require('./user')
const router = express.Router()

router.get('/', function(req, res){
    res.render('home.ejs')
})

router.use('/users', userRouter)


module.exports = router