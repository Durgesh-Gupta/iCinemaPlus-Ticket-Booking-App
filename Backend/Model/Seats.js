const mongoose = require("mongoose")
const {Schema} = mongoose

const SeatSchema=new Schema({
    showtime:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"showtimes",
        required:true
    },
    seat_no:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:true  //available
    }
})
const Seat=mongoose.model("seats",SeatSchema)
module.exports=Seat