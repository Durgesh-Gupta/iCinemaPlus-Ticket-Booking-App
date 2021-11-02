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
        enum:["Current","Coming Soon","disable"],
    },
    release_date:{
        type:Date,
        required:true
    },
    IS_DELETE:{
        type:Boolean,
        default:false
    },image:{
        type:String
      }
})

const Movies = mongoose.model('movies',MovieSchema)
module.exports=Movies