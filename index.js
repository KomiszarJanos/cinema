const express= require('express');
const mongoose = require('mongoose');
const body_parser=require ('body-parser');
const cors=require('cors');

const app= express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(cors());

const port=3000;

app.listen(port,()=>{console.log(`server is running on port ${port}`)});
const connectDb=async()=>{
    try { await mongoose.connect('mongodb://localhost:27017/cinema');
        console.log('connected');}
    catch (error) {consolee.log(error); process.exit(1);}
};
connectDb();