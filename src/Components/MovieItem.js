import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MovieContext from "../State/MovieContext";

const MovieItem = (props) => {
  const context = useContext(MovieContext);
  const { deleteMovie } = context;
  const { movie,updateMovie } = props;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{movie.title}</h5>
          <i className="bi bi-trash mx-2" onClick={() => {
            deleteMovie(movie._id);
          }}></i>
          <i className="bi bi-pencil-square mx-2" onClick={()=>{updateMovie(movie)}}></i>
        </div>
        <p className="card-text">{movie.description}</p>
        <Link to="#" className="btn btn-primary">
          Book Show
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
