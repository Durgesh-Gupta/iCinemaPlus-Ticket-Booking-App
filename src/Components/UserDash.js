import React, { useEffect, useContext } from "react";
import UserContext from "../State/UserContext";
import NowShowing from "./NowShowing";

const UserDash = () => {
  const context = useContext(UserContext);
  const { UserDetails, UserDetail,TicketCancel } = context;

  useEffect(() => {
    UserDetails();
  }, []);
  if (UserDetail) {
    var seat_arr = UserDetail.seat;
    if(typeof seat_arr =="undefined" ){
      seat_arr=[
        {
          "_id": "...",
          "showtime": "No Booking",
          "seat_no": "",
          "status": false,
          "__v": 0
        }
      ]
    }
console.log(UserDetail)
    console.log("seat_arr inside if", seat_arr);
  }
  else{
    var seat_arr= [
        {
          "_id": false,
          "showtime": "Loading...",
          "seat_no": "Loading..",
          "status": false,
          "__v": 0
        }
      ]
  }

  //Ticket Cancelation
  const hancleCancel=(seat)=>{
    console.log(seat)
    var rev = UserDetail.reservation;
    const revId = rev.find((revd) => revd.seat_no === seat);
    console.log(revId._id)
    // TicketCancel
    
  }


  return (
    <div className="Container">
      <div className="row">
        <div className="col-8 offset-2">
          <h4>Booking</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Movie</th>
                <th scope="col">ShowTime</th>
                <th scope="col">Seat No</th>
              </tr>
            </thead>
            <tbody>
              {/* {UserDetail ?seat_arr.forEach(seats=>{ */}
              {seat_arr.map((seats) => {
                return (
                  <tr>
                    <th scope="row">1</th>
                    <td>{seats.showtime}</td>
                    <td>{seats.seat_no}</td>
                    <td ><span className={`CancleBtn ${seats._id?"":"d-none"}`} onClick={()=>hancleCancel(seats._id)}> Cancel Booking</span></td>
                  </tr>
                );
              })}
        
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <NowShowing />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
