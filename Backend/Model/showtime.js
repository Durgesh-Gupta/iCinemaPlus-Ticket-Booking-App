const mongoose =require("mongoose")
const {Schema}=mongoose
const ShowTimeSchema = new Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        required:true
    },
    theater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"theater",
        required:true
    },
    time:{
        type:String,
        enum:["9:00 AM","12:00 PM","6:00 PM"],
        required:true,
    }
})
const ShowTime =mongoose.model("showtimes",ShowTimeSchema)
module.exports = ShowTime