const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const {connectDb} = require("./connection")

connectDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen( process.env.PORT ,()=>{
    console.log(`Server is listening on port:${process.env.PORT}`);
});