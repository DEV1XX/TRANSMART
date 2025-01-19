const express = require('express');
const app = express();
const routes = require('./routes')

const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const {connectDb} = require("./connection")

connectDb()
.then(() => {console.log("Database connected successfully!")})
.catch((error) => {
    console.error("Database connection failed", error.message);
    process.exit(1); //exit the process if database connection fails
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes); // Prefix all routes with /api

// Handle undefined routes
app.use((req,res)=>{
    res.status(404).json({ success: false, message: "Route not found" });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal server error" });
});
//A global error handler in an Express application is middleware that centralizes the handling of errors that occur during request processing. Instead of duplicating error-handling logic across multiple routes or controllers, you define a single middleware to manage and respond to all errors in a consistent way.

app.listen( process.env.PORT ,()=>{
    console.log(`Server is listening on port:${process.env.PORT}`);
});

