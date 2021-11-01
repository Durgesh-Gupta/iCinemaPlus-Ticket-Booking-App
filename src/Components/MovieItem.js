import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import MovieContext from "../State/MovieContext"

const MovieItem = (props) => {
    console.log(props)
    const context =useContext(MovieContext)

    return (
            <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{props.movie.title}</h5>
              <p className="card-text">
                {props.movie.description}
              </p>
              <Link to="#" className="btn btn-primary" >
                Book Show
              </Link>
            </div>
          </div>
    )
}

export default MovieItem
