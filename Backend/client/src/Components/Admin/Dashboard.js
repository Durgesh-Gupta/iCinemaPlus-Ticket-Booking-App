import React,{useState,useContext, useRef} from 'react'
import MovieContext from "../../State/MovieContext";
import MovieItem from '../MovieItem';
import Pagination from '../Pagination';


const Dashboard = () => {
    const context = useContext(MovieContext);
  const { Movies, AdminDetails,getMovies, editMovie,AllDetails } = context;
  

  // Modal
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [Movie, setMovie] = useState({is:"",etitle:"",edescription:"",egenre:""});

  const updateMovie = (currentMovie) => {
    ref.current.click();
    console.log("currentMovie",currentMovie)
    setMovie({
      id: currentMovie._id,
      etitle: currentMovie.title,
      edescription: currentMovie.description,
      // erelease_date: currentMovie.release_date,
      egenre: currentMovie.genre,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Movies",Movie)
    editMovie({
      id:currentMovie.id,
      title:Movie.etitle,
      description:Movie.edescription,
      genre:Movie.egenre,
      // Movie.erelease_date
    }
    );
    refClose.current.click();
  };
  const onChange = (e) => {
    setMovie({ ...Movie, [e.target.name]: e.target.value });
  };





  //SearchBar
  const [Search, setSearch] = useState("");
  var MovieMod = Movies.filter((mov) => {
    // if (Search == "") {
    //   return mov.status === "Current";
    // } else
     if (mov.title.toLowerCase().includes(Search.toLowerCase())) {
    //   console.log(mov.title.toLowerCase().includes(Search.toLowerCase()));
      return mov
      // .status === "Current";
    }
    console.log("Movie mod",MovieMod)
  });
  const SearchHandle = (e) => {
    setSearch(e.target.value);
    // console.log(Search);
  };

  //   Pagination
  //Paginamtion
  const [currentPage, setcurrentPage] = useState(1);
  const [MovPerPage, setMovPerPage] = useState(3);

  const indexOfLast = currentPage * MovPerPage;
  const indexOfFirst = indexOfLast - MovPerPage;
  const currentMovie = MovieMod.slice(indexOfFirst, indexOfLast);
//   console.log("currentMovie", currentMovie);
  //Change Page
  const paginate = (pageNo) => {
    setcurrentPage(pageNo);
  };
  
  
  
  return (
        <div>
            <div className="row">
          <div className="col">
            <div
              className="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div className="card-header text-center">Total Movies</div>
              <div className="card-body">
                <h5 className="card-title text-center">{Movies.length}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div className="card-header text-center">Total Users</div>
              <div className="card-body">
                <h5 className="card-title text-center">
                  {AllDetails.users ? AllDetails.users.length : "Loading"}
                </h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card border-dark  mb-3"
              //   style={{ maxWidth: "10rem" }}
            >
              <div className="card-header text-center">Total Seats Available</div>
              <div className="card-body">
                <h5 className="card-title text-center">
                  {AllDetails
                    ? AllDetails.showtimes.length * 14 -
                      AllDetails.reservations.length
                    : "Loading"}
                </h5>
              </div>
            </div>
          </div>
        </div>
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
                    type="text"
                    className="form-control"
                    id="erelease_date"
                    name="erelease_date"
                    value={Movie.erelease_date}
                    onChange={onChange}
                    required
                  />
                </div> */}
                <div className="mb-3">
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
                </div>
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
    )
}

export default Dashboard
