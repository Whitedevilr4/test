import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
// import isEmail from "validator/lib/isEmail.js";

const handleLogin = async (req,res)=>{
    const {email,password} = req.body   
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:"user not found!!!"})
        }
        const isMath = await bcrypt.compare(password,user.password)
        if(!isMath){
            return res.json({success:"password not match!!!"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log("Login User got an error:-",error);
        res.status(404).json({success:"false",msg:"login error"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const handleRegisterUser = async (req,res)=>{
    const{name,password,email} = req.body
   try {
     if(!name || !password || !email){
        return res.status(400).json({success:"all field require!!!"})
     }
     const exists = await userModel.findOne({email})
     if(exists){
         return res.json({success:"user already exists!!!"})
     }
     if(!validator.isEmail(email)){
         return res.json({success:"please entry the valid email !!!"})
     }
     if(password.length<8){
        return res.json({success:"please entry 8 digit password !!!"})
     }
     //hashing iser password
     const salt = await bcrypt.genSalt(10)
     const hashPassword = await bcrypt.hash(password,salt)

     const user = await userModel.create({name,email,password:hashPassword})
     const token = createToken(user._id)
     res.json({success:true,token})
   } catch (error) {
    console.log("Register User got an error:-",error);
    res.status(404).json({success:"false"})
   }
}

export {
    handleLogin,
    handleRegisterUser
}