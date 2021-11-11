import React, { useEffect, useContext } from "react";
import UserContext from "../State/UserContext";
import NowShowing from "./NowShowing";

const UserDash = () => {
  const context = useContext(UserContext);
  const { UserDetails, UserDetail } = context;

  useEffect(() => {
    UserDetails();
  }, []);
  if (UserDetail) {
    var seat_arr = UserDetail.seat;

    console.log("seat_arr", seat_arr);
  }
  else{
    var seat_arr= [
        {
          "_id": "618d235565dca9ff7ed60eb6",
          "showtime": "Not Loaded",
          "seat_no": 1,
          "status": false,
          "__v": 0
        },
        {
          "_id": "618d236565dca9ff7ed60ec0",
          "showtime": "6188b9bdf083697c5dae7e20",
          "seat_no": 3,
          "status": false,
          "__v": 0
        },
        {
          "_id": "618d236865dca9ff7ed60ec5",
          "showtime": "6188b9bdf083697c5dae7e20",
          "seat_no": 4,
          "status": false,
          "__v": 0
        }
      ]
  }
  return (
    <div className="Container">
      <div className="row">
        <div className="col-8 offset-2">
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
                    <td>Otto</td>
                    <td>@mdo</td>
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
