import React from 'react'
import { Link } from 'react-router-dom'

const MovieshowCase = (props) => {

    const { movie } = props;

    return (
        <div className="card" style={{ width: "18rem" }}>
      <img src={`http://localhost:5000/public/uploads/images/${movie.image}`} height="360px" className="card-img-top" alt="Movie" />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{movie.title}</h5>
         
        </div>
        <p className="card-text">{movie.description}</p>
        <Link to={`/booking/${movie._id}`} className="btn btn-primary">
          Book Show
        </Link>
      </div>
    </div>
    )
}

export default MovieshowCase
