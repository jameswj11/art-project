'use strict'
const express         = require('express')
const logger          = require('morgan')
const path            = require('path')
const bodyParser      = require('body-parser')
const session         = require('express-session')
const methodOverride  = require('method-override')
const homeRoute       = require('./routes/home_route')
const collectionRoute = require('./routes/collection_route')
const userRoute       = require('./routes/user_route')
const saveRoute       = require('./routes/save_route')
const apiRoute        = require('./routes/api_route')
const rijksRoute      = require('./routes/rijks_route')


//server setup
const app   = express()
const PORT  = process.env.PORT || process.argv[2] || 3000;
app.listen(PORT, ()=>{console.log('server started on port', PORT)})

//middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'supersecret',
  cookie: {maxAge: 999999}
}))


//public
app.use(express.static(path.join(__dirname, 'public')))

//views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routing
app.use('/', homeRoute)
app.use('/save', saveRoute)
app.use('/user', userRoute)
app.use('/collection', collectionRoute)
app.use('/api', apiRoute)
app.use('/rijks', rijksRoute)
