import React,{useContext} from 'react'
import MovieContext from "../../State/MovieContext";


const Dashboard = () => {
    const context = useContext(MovieContext);
  const { Movies, getMovies, editMovie,AllDetails } = context;
    return (
        <div>
            <div className="row">
          <div className="col">
            <div
              class="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div class="card-header text-center">Total Movies</div>
              <div class="card-body">
                <h5 class="card-title text-center">{Movies.length}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              class="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div class="card-header text-center">Total Users</div>
              <div class="card-body">
                <h5 class="card-title text-center">
                  {AllDetails.users ? AllDetails.users.length : "Loading"}
                </h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              class="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div class="card-header text-center">Total Seats Available</div>
              <div class="card-body">
                <h5 class="card-title text-center">
                  {AllDetails
                    ? AllDetails.showtimes.length * 14 -
                      AllDetails.reservations.length
                    : "Loading"}
                </h5>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Dashboard
