const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async ()=>{
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);
        if(connection){
            console.log("Connected to MongoDB!");
        }
        
    } catch (error) {
        return error.message;
    }
}

module.exports = {connectDb};