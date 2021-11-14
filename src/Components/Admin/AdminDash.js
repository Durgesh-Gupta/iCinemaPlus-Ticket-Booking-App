import React, { useState, useContext, useEffect, useRef } from "react";
import AddMovie from "./AddMovie";
import MovieItem from "../MovieItem";
import MovieContext from "../../State/MovieContext";
import { useHistory } from "react-router-dom";
import Pagination from "../Pagination";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetails from "./UserDetails";
import AddShowtime from "./AddShowtime";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";


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
    //   console.log("AllDetails", AllDetails);
    //   console.log("json", json);
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
  //LogOut
  const handleLogout = () => {
    localStorage.removeItem("Authtoken");
    history.push("/Admin");
  };

  //SearchBar
  const [Search, setSearch] = useState("");
  var MovieMod = Movies.filter((mov) => {
    if (Search == "") {
      return mov.status === "Current";
    } else if (mov.title.toLowerCase().includes(Search.toLowerCase())) {
    //   console.log(mov.title.toLowerCase().includes(Search.toLowerCase()));
      return mov.status === "Current";
    }
  });
  const SearchHandle = (e) => {
    setSearch(e.target.value);
    // console.log(Search);
  };

  //   Pagination
  //Paginamtion
  const [currentPage, setcurrentPage] = useState(1);
  const [MovPerPage, setMovPerPage] = useState(1);

  const indexOfLast = currentPage * MovPerPage;
  const indexOfFirst = indexOfLast - MovPerPage;
  const currentMovie = MovieMod.slice(indexOfFirst, indexOfLast);
//   console.log("currentMovie", currentMovie);
  //Change Page
  const paginate = (pageNo) => {
    setcurrentPage(pageNo);
  };

  return (
    <div className="container-fluid">
      <div className="contaier">
        
        <div className="container">
        <Router>
        <AdminNavbar/>
        <Switch>
          <Route exact path="/">
            {/* <AddMovie /> */}
            <Dashboard/>
          </Route>
          <Route exact path="/user">
            <UserDetails AllDetails={AllDetails}/>
          </Route>
          <Route exact path="/addshow">
            <AddShowtime/>
          </Route>
          </Switch>
          </Router>
        </div>
      </div>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      {/* <AddMovie /> */}
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
          <div className="row">
            <div className="col-4">
              <h1>All Movies</h1>
            </div>
            <div className="col-3 pt-3">
              <input
                className="form-control form-control-sm"
                value={Search}
                onChange={SearchHandle}
                type="text"
                placeholder="Search Movie..."
              />
            </div>
          </div>

          <div className="row">
            {currentMovie.map((movies) => {
              return (
                <MovieItem
                  key={movies._id}
                  updateMovie={updateMovie}
                  movie={movies}
                />
              );
            })}
          </div>
          <div className="row">
            <div className="col-12">
              <Pagination
                MovPerPage={MovPerPage}
                totalMov={MovieMod.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
