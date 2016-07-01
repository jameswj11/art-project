'use strict'
const express         = require('express')
const logger          = require('morgan')
const path            = require('path')
const bodyParser      = require('body-parser')
const homeController  = require('./controllers/home_controller')
const apiController   = require('./controllers/api_controller')
const rijksController = require('./controllers/rijks_controller')
const momaController  = require('./controllers/moma_controller')


//server setup
const app   = express()
const PORT  = process.env.PORT || process.argv[2] || 3000;

app.listen(PORT, ()=>{console.log('server started on port', PORT)})

//middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))

//public
app.use(express.static(path.join(__dirname, 'public')))

//views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routing
app.use('/', homeController)
app.use('/api', apiController)
app.use('/rijks', rijksController)
app.use('/moma', momaController)
