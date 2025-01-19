const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//SIGNUP ROUTE
const signup = async (req,res) => {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try{
        let user = await User.findOne({ email });
        if(user)  return res.status(400).json({success: false, message: "Email already in use!"});
        let hashedpw = await bcrypt.hash(password,10); // 10 is the number of salt rounds
        
        user = await User.create({
            email,
            password: hashedpw,
            name
        });
        
        return res.status(201).json({ success: true, message: "Signup successful!" });

    }catch(error){
        return res.status(500).json({success: false, message: "An error occurred during signup." });
    }
}
//LOGIN ROUTE 
const login = async (req,res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({success: false, message: "Invalid email or password!"});
        }
        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid email or password!"});
        }
        //GENERATE COOKEIES
        const token = jwt.sign({userId: user._id, email: user.email},process.env.JWT_SECRET,{expiresIn: '24h'});
        //SEND GENERATED COOKIES BACK TO CLIENT
        res.cookie('token', token, {
            httpOnly: true,   // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Sends cookie only over HTTPS in production
            sameSite: 'strict' // Prevents CSRF attacks by ensuring the cookie is sent only for same-site requests
        });
        return res.status(200).json({ success: true, token, message: "Login successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:"Login Unsuccessful!"})
    }
}

//LOGOUT ROUTE
const logout = async (req,res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({success: true, message: 'Logout successful !'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message:"Logout failed!"})
    }
}

module.exports = {signup,login,logout}
