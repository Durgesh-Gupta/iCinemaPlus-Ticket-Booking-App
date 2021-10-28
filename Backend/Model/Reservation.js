const mongoose =require("mongoose")
const {Schema} =mongoose

const ReservationSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    seat_no:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"seats",
        required:true
    },
    showtime:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"showtimes",
        required:true
    }
})
const Reservation =mongoose.model("Reservation",ReservationSchema)
module.exports=Reservation