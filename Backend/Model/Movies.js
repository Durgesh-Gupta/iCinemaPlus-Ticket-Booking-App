const mongoose =require("mongoose")
const {Schema}=mongoose

const MovieSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    genre:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Current","Comming Soon","disable"],
        default:"Comming Soon"
    },
    release_date:{
        type:Date,
        required:true
    }
})

const Movies = mongoose.model('movies',MovieSchema)
module.exports=Movies