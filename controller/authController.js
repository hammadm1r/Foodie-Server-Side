const { signjwt } = require('../middleware/jwtAuthMiddleware');
const user = require('../models/user')

const signup = async(req,res)=>{
    const {name,email,password,phone_number,address,postal_code} = req.body;
    if(!name||!email||!password||!phone_number||!address||!postal_code){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    const userExist = await user.findOne({email});
    if(userExist){
       return res.status(400).json("User Already Existed");
    }
    const newUser = new user({name,email,password,phone_number,address,postal_code});
    const response =newUser.save();
    const token =  signjwt(newUser._id);
    console.log(token);
    return res.json(newUser);
};


const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    const userExisted = await user.findOne({email});
    if(!userExisted){
        return res.status(400).json("User does'nt Existed");
    }
    const isMatch = await userExisted.comparePassword(password);
    if(!isMatch){
        return res.status(400).json("Password does'nt Matched");
    }
    const token =  signjwt(userExisted._id);
    console.log(token);
    return res.json(userExisted);
};

module.exports={signup,login};