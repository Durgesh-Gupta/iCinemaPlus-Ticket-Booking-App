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
  const ClickSelect = (e) => {
    setCount(Count + 1);
    setSeatBooked([...SeatBooked, id]);
    setPrice((Count + 1) * 100);

    $(".seat").on("click", function (e) {
      $(this).toggleClass("selected");
    });
  };
  const [formValue, setformValue] = useState({ theater: "", time: "" });
  const [formTheater, setformTheater] = useState("");
  const onChangetheater = (e) => {
    setformTheater(e.target.value);
    console.log("formvalue", formTheater);
  };
  const [formTime, setformTime] = useState("");
  const onChangeTime = (e) => {
    setformTime(e.target.value);
    console.log("formvalue", formTime);
  };
  const onChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };
  //ShowTime Details
  const ShowtimeD = BookingDetails.showtime;

  if (ShowtimeD) {
    var cinema = [...new Set(ShowtimeD.map((item) => item.theater))];
  } else {
    cinema = { one: "Wait" };
    console.log("Not load");
  }
  const seats = Array.from({ length: (35 - 1) / 1 }, (_, i) => i);

  const miniFormHandle = () => {};
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Poster after selecting */}
        <div className="col-lg-3">
          <img src="demo.jpg" />
          <h1>{BookingDetails.title}</h1>
        </div>
        {/* Booking */}
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-12 text-light">
              <div className="row">
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
            <div className="col-lg-12 text-dark">
              <div className="col-lg-12 text-dark justify-content-center">
                <div className="container" id="movie-container">
                  <div className="row mt-5">
                    {seats.map((seat_no) => {
                      return (
                        <div
                          key={seat_no}
                          id={seat_no + 1}
                          onClick={ClickSelect}
                          className="seat"
                        >
                          {seat_no + 1}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text">
                    You have selected <span id="count">0 - {Count}</span> seats
                    for a price of $<span id="total">{Price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
