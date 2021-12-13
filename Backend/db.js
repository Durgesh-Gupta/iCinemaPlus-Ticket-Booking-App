const mongoose =require("mongoose")

const mongoURI="mongodb+srv://Durgesh10:Durgesh10@cluster0.jmbqs.mongodb.net/icinema?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Databse Successfully")
    })
}
module.exports=connectToMongo