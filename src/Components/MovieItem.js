import React from 'react'
import { Link } from 'react-router-dom'

const MovieItem = (props) => {
    console.log(props)
    return (
            <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{props.movie.title}</h5>
              <p className="card-text">
                {props.movie.description}
              </p>
              <Link to="#" className="btn btn-primary" >
                Go somewhere
              </Link>
            </div>
          </div>
    )
}

export default MovieItem
