import React, { useContext } from "react";
import MovieContext from "../State/MovieContext";

const MovieItem = (props) => {
  const context = useContext(MovieContext);
  const { deleteMovie } = context;
  const { movie,updateMovie } = props;
  // console.log(movie)
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={`http://localhost:5000/public/uploads/images/${movie.image}`} className="card-img-top" alt="Movie" />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{movie.title}</h5>
          <i className="bi bi-trash mx-2" onClick={() => {
            deleteMovie(movie._id);
          }}></i>
          <i className="bi bi-pencil-square mx-2" onClick={()=>{updateMovie(movie)}}></i>
        </div>
        <p className="card-text">{movie.description}</p>
        
      </div>
    </div>
  );
};

export default MovieItem;
