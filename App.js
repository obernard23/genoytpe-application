const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const Dotenv = require('./.env')


//initialize app 
const app = express()

mongoose.set('strictQuery',true)
mongoose.connect(Dotenv.dbUrl,{useNewUrlParser: true})
.then(result=>console.log('connected to db'))
.catch(err=>console.log(err))

//register views 
app.set('view engin','ejs')

//middle ware
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

//listen for server 
app.listen(Dotenv.PORT,()=>{
    console.log('connected to port ')
})

//declare public folder
app.set('public')

//
