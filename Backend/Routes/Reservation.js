const express = require("express")
const router = express.Router()

const Reservation =require("../Model/Reservation")
const Seats=require("../Model/Seats")
const User=require("../Model/User")
const ShowTime=require("../Model/showtime")
const fetchuser =require("./Middleware/fetchuser")

//Route 1:Ticket Booking
router.post("/select",fetchuser,async (req,res)=>{
    const {seat_no,showtime,user}=req.body
    const SeatNo=await Seats.findOne({seat_no:seat_no,showtime:showtime})
    if(SeatNo){
        res.status(401).json({error:"Seat is Already Booked"})
    }
    // Ading seat
    const seat = new Seats({showtime,seat_no,status:false });
    const saveSeat = await seat.save();
    // res.send(saveSeat);

    // Adding reservation
    const reservation = new Reservation({user,showtime,seat_no:saveSeat._id });
    const saveReservation = await reservation.save();
    res.send({saveReservation});
})
//Route 2:Get User Booking Details
router.post("/getdetail",fetchuser,async (req,res)=>{
    const userId=req.user.id;
    const reservation=await Reservation.find({userId})  
    res.json(reservation)
})
//Route 3: Cancel Booking---id of reservation
router.post("/cancel/:id",fetchuser,async (req,res)=>{
 let reservation= await Reservation.findById(req.params.id);
 //check booking
 if(!reservation){
     res.status(404).send("Booking Not Found!")
 }
 //Match booking user
 if(reservation.user.toString()!==req.user.id){
     return res.status(401).send("Unauthorized User")
 }
 //reservation cancelled
reservation=await Reservation.findByIdAndDelete(req.params.id)
// Seat removell
const seat=await Seats.findByIdAndDelete(reservation.seat_no)
res.json({"Success":"Booking is Cancelled",reservation,seat})

})

module.exports=router