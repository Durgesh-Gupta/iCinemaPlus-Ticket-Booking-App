import React, { useContext } from "react";
import MovieContext from "../State/MovieContext";

const MovieItem = (props) => {
  const context = useContext(MovieContext);
  const { deleteMovie } = context;
  const { movie, updateMovie } = props;



  // console.log("Inside Eacg",movie.status)
  return (
    <div className="col-4">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`/public/uploads/images/${movie.image}`}
          className="card-img-top img-fluid poster"
          alt="Movie"
        />
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{movie.title}</h5>
            <i
              className="bi bi-trash mx-2"
              onClick={() => {
                deleteMovie(movie._id);
              }}
            ></i>
            <i
              className="bi bi-pencil-square mx-2"
              onClick={() => {
                updateMovie(movie);
              }}
            ></i>
          </div>
          <p className="card-text"><span className="badge bg-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Movie status ">{movie.status}</span>
          <span className={`badge bg-${movie.IS_DELETE?"danger":"success"}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Movie Deleted or Not">{movie.IS_DELETE?"Disabled":"Active"}</span>

</p>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
