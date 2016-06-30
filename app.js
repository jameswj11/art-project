'use strict'
const express     = require('express')
const logger      = require('morgan')
const path        = require('path')
const bodyParser  = require('body-parser')

//server setup
const app   = express()
const PORT  = process.env.PORT || process.argv[2] || 3000;

app.listen(PORT, ()=>{console.log('server started on port', PORT)})

//middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

//public
app.use(express.static(path.join(__dirname, 'public')))

//views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routing
app.get('/', (req, res)=>{res.render('home')})
