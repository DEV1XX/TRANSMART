const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async ()=>{
    try {
        const connection =  mongoose.connect(process.env.MONGO_URI,
            {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                serverSelectionTimeoutMS: 500000, // 5 seconds timeout
            }
        );
        if(connection){
            console.log("Connected to MongoDB!");
        }
        
    } catch (error) {
        return error.message;
    }
}

module.exports = {connectDb};