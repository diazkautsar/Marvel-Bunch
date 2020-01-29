const express = require('express')
const routes = require('./routers/index')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.listen(port, (_) => {
    console.log('I love you', port)
})