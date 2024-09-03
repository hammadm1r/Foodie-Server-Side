///// Require /////

const express = require('express')
const dbconnection =require('./db');
const app = express();
const authentication = require('./router/authentication')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const productRouter = require('./router/productRouter');

///// Require /////

////  Configuration ////

require('dotenv').config()
dbconnection;

////  Configuration ////


////  Declaration  ////
const PORT = process.env.PORT;

////  Declaration  ////

app.use(cors({ 
    credentials: true,
    origin:'http://localhost:5173',
 }));
app.use('/uploads',express.static('uploads'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products",productRouter)
app.use("/auth",authentication)
app.get("/",(req,res)=>{res.send('Hello World')});
app.listen(PORT);
