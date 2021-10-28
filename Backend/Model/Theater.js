const mongoose =require("mongoose")
const {Schema}= mongoose

const TheaterSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    row:{
        type:Number,
        required:true
    },
    seat_no:{
        type:Array,
       default:[]
    }
})

const Theater =mongoose.model("theater",TheaterSchema)

module.exports=Theater