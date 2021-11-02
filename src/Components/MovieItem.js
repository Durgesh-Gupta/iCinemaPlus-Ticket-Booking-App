import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import MovieContext from "../State/MovieContext"

const MovieItem = (props) => {
    const context =useContext(MovieContext)
    const {deleteMovie}=context
  const {movie}=props
    return (
            <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                {movie.description}
              </p>
              <Link to="#" className="btn btn-primary" >
                Book Show
              </Link>
            <button onClick={()=>{deleteMovie(movie._id)}}>Delete</button>
            </div>
          </div>
    )
}

export default MovieItem
