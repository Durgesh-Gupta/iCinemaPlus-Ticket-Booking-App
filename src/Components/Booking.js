import React, { useContext,useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieContext from "../State/MovieContext";
import "../index.js"
import $ from "jquery";

const Booking = () => {
  const { id } = useParams(); //Movie id
  const context = useContext(MovieContext)
  const {fetchBooking}=context

  //Fetch Moviews Booking Details
  useEffect(() => {
    fetchBooking(id);
  }, []);
  const [SeatBooked, setSeatBooked] = useState([])
  const [Count, setCount] = useState(0)
  const [Price, setPrice] = useState(0)
  const ClickSelect=(e)=>{
    
    setCount(Count+1)
    setSeatBooked([...SeatBooked,id])
    setPrice((Count+1)*100)

    $('.seat').on('click', function(e){

      $(this)
      .toggleClass('selected')
  
  })
    // document.getElementsByClassName("seat").classList.toggle("selected")

  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Poster after selecting */}
        <div className="col-lg-3">
          <img src="demo.jpg" />
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
                  >
                    <option defaultValue>Select Cinema</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                  >
                    <option defaultValue>Select Time</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                    <div id = "1" onClick={ClickSelect}  className="seat">1</div>
                    <div id="2" onClick={ClickSelect}  className="seat">2</div>
                    <div onClick={ClickSelect} className="seat">3</div>
                    <div onClick={ClickSelect} className="seat">4</div>
                    <div onClick={ClickSelect} className="seat">5</div>
                    <div onClick={ClickSelect} className="seat">6</div>
                    <div onClick={ClickSelect} className="seat">7</div>
                    <div onClick={ClickSelect} className="seat">8</div>
                  </div>
                  <div className="row">
                    <div onClick={ClickSelect} className="seat">1</div>
                    <div onClick={ClickSelect} className="seat">2</div>
                    <div onClick={ClickSelect} className="seat">3</div>
                    <div onClick={ClickSelect} className="seat reserved">4</div>
                    <div onClick={ClickSelect} className="seat reserved">5</div>
                    <div onClick={ClickSelect} className="seat">6</div>
                    <div onClick={ClickSelect} className="seat">7</div>
                    <div onClick={ClickSelect} className="seat">8</div>
                  </div>
                  <div className="row">
                    <div className="seat">1</div>
                    <div className="seat">2</div>
                    <div className="seat">3</div>
                    <div className="seat">4</div>
                    <div className="seat">5</div>
                    <div className="seat">6</div>
                    <div className="seat">7</div>
                    <div className="seat">8</div>
                  </div>
                  <div className="row">
                    <div className="seat">1</div>
                    <div className="seat">2</div>
                    <div className="seat">3</div>
                    <div className="seat reserved">4</div>
                    <div className="seat reserved">5</div>
                    <div className="seat">6</div>
                    <div className="seat">7</div>
                    <div className="seat">8</div>
                  </div>
                  <div className="row">
                    <div className="seat">1</div>
                    <div className="seat">2</div>
                    <div className="seat">3</div>
                    <div className="seat reserved">4</div>
                    <div className="seat reserved">5</div>
                    <div className="seat">6</div>
                    <div className="seat">7</div>
                    <div className="seat">8</div>
                  </div>
                </div>

                <p className="text">
                  You have selected <span id="count">0 - {Count}</span> seats for a price
                  of $<span id="total">{Price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
