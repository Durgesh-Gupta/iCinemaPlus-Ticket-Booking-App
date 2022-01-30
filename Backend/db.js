const mongoose =require("mongoose")
require('dotenv').config()
const mongoURI=process.env.DB 


const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Databse Successfully")
    })
}
module.exports=connectToMongo