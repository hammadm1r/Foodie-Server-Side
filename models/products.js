const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    image : {
        type: String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    category :{
        type:String,
        required:true
    },
    quantity :{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('products',productSchema);