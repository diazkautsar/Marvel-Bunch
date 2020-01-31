const express = require('express')
const userRouter = require('./user')
const adminRouter = require('./admin')
const router = express.Router()

router.get('/', function(req, res){
    const msg = req.query.msg
    res.render('home.ejs', {msg})
})

router.use('/users', userRouter)
router.use('/admins', adminRouter)


module.exports = router