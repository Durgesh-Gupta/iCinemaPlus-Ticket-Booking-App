import React from "react";

const Booking = (props) => {
  console.log("prop",props);
  const {id}=props
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
                <div className="container ">
      <div class="row mt-5">
        <div class="seat">1</div>
        <div class="seat">2</div>
        <div class="seat">3</div>
        <div class="seat">4</div>
        <div class="seat">5</div>
        <div class="seat">6</div>
        <div class="seat">7</div>
        <div class="seat">8</div>
      </div>
      <div class="row">
        <div class="seat">1</div>
        <div class="seat">2</div>
        <div class="seat">3</div>
        <div class="seat reserved">4</div>
        <div class="seat reserved">5</div>
        <div class="seat">6</div>
        <div class="seat">7</div>
        <div class="seat">8</div>
      </div>
      <div class="row">
        <div class="seat">1</div>
        <div class="seat">2</div>
        <div class="seat">3</div>
        <div class="seat">4</div>
        <div class="seat">5</div>
        <div class="seat">6</div>
        <div class="seat">7</div>
        <div class="seat">8</div>
      </div>
      <div class="row">
        <div class="seat">1</div>
        <div class="seat">2</div>
        <div class="seat">3</div>
        <div class="seat reserved">4</div>
        <div class="seat reserved">5</div>
        <div class="seat">6</div>
        <div class="seat">7</div>
        <div class="seat">8</div>
      </div>
      <div class="row">
        <div class="seat">1</div>
        <div class="seat">2</div>
        <div class="seat">3</div>
        <div class="seat reserved">4</div>
        <div class="seat reserved">5</div>
        <div class="seat">6</div>
        <div class="seat">7</div>
        <div class="seat">8</div>
      </div>

    </div>

    <p class="text">
      You have selected <span id="count">0</span> seats for a price of $<span id="total">0</span>
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
