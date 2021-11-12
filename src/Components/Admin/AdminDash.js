import React, { useState, useContext, useEffect, useRef } from "react";
import AddMovie from "./AddMovie";
import MovieItem from "../MovieItem";
import MovieContext from "../../State/MovieContext";
import { useHistory } from "react-router-dom";

function AdminDash() {
  const context = useContext(MovieContext);
  const { Movies, getMovies, editMovie } = context;
  const history = useHistory();

  var [AllDetails, setAllDetails] = useState("");
  //Fetch All Moviews
  useEffect(() => {
    if (localStorage.getItem("Authtoken")) {
      // fetchBooking(id);
    } else {
      history.push("/AdminLogin");
    }
    //API Request For Adm9in Details
    getMovies();

    const AdminDetails = async () => {
      const response = await fetch(
        "http://localhost:5000/api/admin/adminDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Authtoken"),
          },
        }
      );
      const json = await response.json();
      setAllDetails(json);
      console.log("AllDetails", AllDetails);
      console.log("json", json);
    };
    AdminDetails();
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [Movie, setMovie] = useState("");

  const updateMovie = (currentMovie) => {
    ref.current.click();
    setMovie({
      id: currentMovie._id,
      etitle: currentMovie.title,
      edescription: currentMovie.description,
      erelease_date: currentMovie.release_date,
      egenre: currentMovie.genre,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editMovie(
      Movie.id,
      Movie.etitle,
      Movie.edescription,
      Movie.egenre,
      Movie.erelease_date
    );
    refClose.current.click();
  };
  const onChange = (e) => {
    setMovie({ ...Movie, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    localStorage.removeItem("Authtoken");
    history.push("/Admin");
  };
  return (
    <div className="container-fluid">
      <div className="contaier">
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
                <h5 class="card-title text-center">{AllDetails.users?AllDetails.users.length:"Loading"}</h5>
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
                <h5 class="card-title text-center">{AllDetails?((AllDetails.showtimes.length)*14-(AllDetails.reservations.length)):"Loading"}</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      <AddMovie />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modify Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3" encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={Movie.etitle}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={Movie.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="release_date" className="form-label">
                    release_date
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    id="erelease_date"
                    name="erelease_date"
                    value={Movie.erelease_date}
                    onChange={onChange}
                    required
                  />
                </div> */}
                {/* <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    genre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="egenre"
                    name="egenre"
                    value={Movie.egenre}
                    onChange={onChange}
                    required
                  />
                </div> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <h4>Recommanded Movies</h4>
          <div className="row">
            {Movies.map((movies) => {
              return (
                <MovieItem
                  key={movies._id}
                  updateMovie={updateMovie}
                  movie={movies}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;