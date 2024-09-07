const { signjwt } = require('../middleware/jwtAuthMiddleware');
const user = require('../models/user')
const { error } = require("../utils/responseWrapper");
const { success } = require("../utils/responseWrapper");

const signup = async(req,res)=>{
    try {
        const {name,email,password,phone_number,address,postal_code} = req.body;
    if(!name||!email||!password||!phone_number||!address||!postal_code){
        return res.send(error(400,'All fields are Required'));
    }
    const userExist = await user.findOne({email});
    if(userExist){
        return res.send(error(409,'User is Already Registered'));
    }
    const newUser = new user({name,email,password,phone_number,address,postal_code});
    const response =newUser.save();
    const token =  signjwt(newUser._id);
    console.log(token);
    return res.send(success(201,{token}));
    } catch (error) {
        return res.send(error(500,e.message));
    }
    
};


const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    const userExisted = await user.findOne({email});
    if(!userExisted){
        return res.send(error(403,"User does'nt Existed"));
    }
    const isMatch = await userExisted.comparePassword(password);
    if(!isMatch){
        return res.send(error(403,'Incorrect Password'));
    }
    const token =  signjwt(userExisted._id);
    return res.send(success(200, {token}));
    } catch (e) {
        return res.send(error(500,e.message));
    }
    
};

const profile = async(req,res) => {
    try {
        const user_Id = req.user.user_id
        const userProfile = await user.findById(user_Id);
        if(!userProfile){
            return res.status(400).json({message:"Profile Not Found"})
        }
        return res.send(success(200,{userProfile}));
    } catch (error) {
        return res.send(error(500,e.message));
    }
}

const verification = async(req,res) => {
    try {
        const user_Id = req.user.user_id
        if(!user_Id){
            return res.send(error(400,false));
        }
        return res.send(success(200,true));
    }catch (error) {
        return res.send(error(500,e.message));
    }
}

module.exports={signup,login,profile,verification};