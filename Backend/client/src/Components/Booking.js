import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import MovieContext from "../State/MovieContext";
import "../index.js";
import $ from "jquery";
import { localsName } from "ejs";

const Booking = () => {
  const { id } = useParams(); //Movie id
  const context = useContext(MovieContext);
  const { fetchBooking, BookingDetails, TicketBooking } = context;
  let history = useHistory();

  //Fetch Moviews Booking Details
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchBooking(id);
    } else {
      history.push("/login");
    }
  }, []);

  const [SeatBooked, setSeatBooked] = useState([]);
  const [Count, setCount] = useState(0);
  const [Price, setPrice] = useState(0);

  const ClickSelect = (seat_no) => {
    if (seat_no in SeatBooked) {
      let array = SeatBooked;
      let newarray = array.filter((element) => element !== seat_no);
      setSeatBooked(newarray);
      console.log("present");
      $(`#${seat_no}`).removeClass("selected");
    } else {
      $(`#${seat_no}`).addClass("selected");

      setSeatBooked([...SeatBooked, seat_no]);
    }
    setCount(SeatBooked.length + 1);
    setPrice((Count + 1) * 100);
    // console.log(SeatBooked);
  };
  const [formValue, setformValue] = useState({ theater: "", time: "" });
  const [formTheater, setformTheater] = useState("");
  const onChangetheater = (e) => {
    // e.preventDefault()
    setformTheater(e.target.value);
    // console.log(formTheater);
    // console.log("formvalue", formTheater);
  };
  const [formTime, setformTime] = useState("");
  const onChangeTime = (e) => {
    // e.preventDefault()

    setformTime(e.target.value);
    console.log("formvalue", formTime);
  };
  const onChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };
  // if
  console.log(formTheater, formTime);

  //ShowTime Details
  //dummy data
  var Reserved_seat = [80];
  var showtime = "6188b99ff083697c5dae7e1c";
  if (
    !(
      Object.keys(BookingDetails).length === 0 &&
      BookingDetails.constructor === Object
    )
  ) {
    // console.log("Inside the temp");
    // var cinema = [...new Set(ShowtimeD.map((item) => item.theater))];
    var { seat_Array } = BookingDetails;
    // console.log(seat_Array);
    // console.log("BookingDetails", BookingDetails);
    // For Reserved Seats--------------------------
    const ResDetail = BookingDetails.seat_Array;
    // console.log(ResDetail)

    var showidtime = BookingDetails.ShowIdTimeTheater;
    const showtimePre = showidtime.find((seat) => seat.Time === formTime);
    var showstatus=true

    if (showtimePre) {
      console.log("showtimePre", showtimePre.id);
      showstatus=true

      var showtime = showtimePre.id;
      console.log("showtime", showtime);
    } else {
      showstatus=false

      // alert("Not show available");
    }
    //       console.log("BookingDetails.ShowIdTimeTheater",BookingDetails.ShowIdTimeTheater)
    // console.log("showtime",showtime)

    // showtime = "6188b99ff083697c5dae7e1c";
    // for()
    const result = ResDetail.filter((seat) => seat.ShowTime == showtime);
    // const result = [
    //   { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 5 },
    //   { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 7 },
    //   { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 8 },
    // ];
    // console.log("Seat",typeof result[0].seatNo)

    // console.log(Reserved_seat, typeof Reserved_seat);

    for (let index = 0; index < result.length; index++) {
      Reserved_seat.push(result[index].seatNo);
    }
    // console.log("Reserved_seat----", Reserved_seat);
  } else {
    // cinema = { one: "Wait" };
    console.log("Not load");
  }
  const seats = Array.from({ length: (15 - 1) / 1 }, (_, i) => 1 + i * 1);

  // const miniFormHandle = () => {

  // };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Poster after selecting */}
        <div className="col-lg-3">
          <img
            width="100%"
            src={`http://localhost:5000/public/uploads/images/${BookingDetails.image}`}
          />
          <h4 className="px-5">{BookingDetails.title}</h4>
        </div>
        {/* Booking */}
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-12 text-light">
              <form>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={onChangetheater}
                  value={formTheater}
                  name="theater"
                >
                  {/* {cinema.map((show)=>{

                    <option value="{show}">{show}</option>
                  })} */}
                  <option defaultValue>Select Theater</option>

                  <option value="PVR">PVR</option>
                  <option value="iMAX">iMAX</option>
                  <option value="NEW-MAX">NEW-MAX</option>
                </select>{" "}
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Date</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>{" "}
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={onChangeTime}
                  value={formTime}
                  name="time"
                >
                  <option >Select Time</option>
                  {/* {showidtime.map((e)=>{
                    <option value={e.id}>{e.Time}</option>

                  })} */}
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>{" "}
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-dark justify-content-center">
              
              <div className={`row mt-5 ${showstatus?"d-none":""}`}>
                <h3 className="text-danger">No Show Available at this Time!</h3>
              </div>
              <div className={`row mt-5 ${!showstatus?"d-none":""}`}>
                {seats.map((seat_no) => {
                  // console.log(Reserved_seat.includes(seat_no))
                  return (
                    <div
                      key={seat_no}
                      id={seat_no}
                      onClick={() => ClickSelect(seat_no)}
                      className={`seat ${
                        Reserved_seat.includes(seat_no) ? "reserved" : ""
                      }`}
                    >
                      {seat_no}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={`row mt-4 ${SeatBooked.length == 0 ? "d-none" : ""}`}>
            <div className="col-8 offset-4">
              <table className="">
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">TICKET</th>
                  <th scope="col">PRICE</th>
                </tr>

                <tr>
                  <td>{}</td>
                  <td>{Count}</td>
                  <td>Rs.{Price}</td>
                </tr>
              </table>
            </div>

            <div className="col-4 ">
              <button
                type="button"
                onClick={() => TicketBooking(showtime, SeatBooked)}
                className="btn btn-outline-primary"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
