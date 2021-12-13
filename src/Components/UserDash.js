import React, { useEffect, useContext } from "react";
import MovieContext from "../State/MovieContext";
import NowShowing from "./NowShowing";

const UserDash = () => {
  const context = useContext(MovieContext);
  const { UserDetails, UserDetail,TicketCancel } = context;
  var seat_arr=[]

  useEffect(() => {
    UserDetails();
  }, []);
  if (UserDetail) {
     seat_arr = UserDetail.seat;
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
    seat_arr= [
        {
          "_id": false,
          "showtime": "No Booking",
          "seat_no": "",
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
    TicketCancel(revId._id)
    
  }


  return (
    <div className="Container">
      <div className="row">
        <div className="col-8 offset-2">
          <h4>Booking</h4>
          <table className="table">
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
                    <th scope="row"></th>
                    <td>{seats.showtime}</td>
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
