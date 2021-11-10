import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieContext from "../State/MovieContext";
import "../index.js";
import $ from "jquery";

const Booking = () => {
  const { id } = useParams(); //Movie id
  const context = useContext(MovieContext);
  const { fetchBooking, BookingDetails } = context;

  //Fetch Moviews Booking Details
  useEffect(() => {
    fetchBooking(id);
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
    setPrice((Count + 1) * 100);
    console.log(SeatBooked);
    // $(".seat").on("click", function (e) {
    //   $(this).toggleClass("selected");
    // });
    setCount(SeatBooked.length);
  };
  const [formValue, setformValue] = useState({ theater: "", time: "" });
  const [formTheater, setformTheater] = useState("");
  const onChangetheater = (e) => {
    setformTheater(e.target.value);
    // console.log("formvalue", formTheater);
  };
  const [formTime, setformTime] = useState("");
  const onChangeTime = (e) => {
    setformTime(e.target.value);
    // console.log("formvalue", formTime);
  };
  const onChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };
  //ShowTime Details

  var Reserved_seat = [80];

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
    const showtime = "6188b99ff083697c5dae7e1c";
    // for()
    // const result = ResDetail.filter((seat) => seat.ShowTime == showtime);
    const result = [
      { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 5 },
      { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 7 },
      { ShowTime: "6188b99ff083697c5dae7e1c", seatNo: 8 },
    ];
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
  const seats = Array.from({ length: (35 - 1) / 1 }, (_, i) => 1 + i * 1);

  // const miniFormHandle = () => {

  // };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Poster after selecting */}
        <div className="col-lg-3">
          <img width="100%"
            src={`http://localhost:5000/public/uploads/images/${BookingDetails.image}`}
          />
          <h4 className="px-5">{BookingDetails.title}</h4>
        </div>
        {/* Booking */}
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-12 text-light">
              <div className="row mt-3">
                <div className="col">
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
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Date</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>{" "}
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={onChangetheater}
                    value={formTheater}
                    name="time"
                  >
                    <option defaultValue>Select Time</option>
                    <option value="9:00AM">9:00AM</option>
                    <option value="12:00PM">12:00PM</option>
                    <option value="6:00PM">6:00PM</option>
                  </select>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-dark justify-content-center">
              <div className="row mt-5">
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
              <table class="">
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
              <button type="button" class="btn btn-outline-primary">
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
