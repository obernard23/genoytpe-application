const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');
const authRoutes  = require('./Routes/authenticate');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authmidddleware');
const Dotenv = require('./.env')


//initialize app 
const app = express()

mongoose.set('strictQuery',true)
mongoose.connect(Dotenv.dbUrl,{useNewUrlParser: true})
.then(result=>{app.listen(Dotenv.PORT,()=>{
    console.log(`connected to ${Dotenv.PORT}`)
}),console.log('connected to db')})
.catch(err=>console.log(err))


//register view engine 
app.set('view engine','ejs');

//for middle ware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

//declare public folder
app.set('public')

//router for routes
app.use(authRoutes);

