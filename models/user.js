const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true
    },
    email :{
        type: String,
        required:true
    },
    phone_number :{
        type:Number,
        required:true
    },
    image : {
        type: String,
        required:true
    },
    address :{
        type:String,
        required:true
    },
    postal_code :{
        type:Number,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    cartItems :[{
        product_Id :{
            type: Schema.Types.ObjectId,
            ref:'products',
        },
        quantity :{
            type:Number,
            default:1,
            max:10,
        }
}]

},{
    timestamps:true
})

userSchema.pre('save',async function (next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(err);
    }
    
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isValid = await bcrypt.compare(candidatePassword, this.password);
        return isValid;
    } catch (error) {
        throw error;
    }
}



module.exports = mongoose.model('user',userSchema);