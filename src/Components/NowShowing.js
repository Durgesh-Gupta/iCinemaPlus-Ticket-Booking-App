import React,{useContext} from "react";
import { Link } from "react-router-dom";
import MovieContext from "../State/MovieContext";
import MovieshowCase from "./MovieshowCase";


const NowShowing = () => {
    const context = useContext(MovieContext);
    const { Movies } = context;
    var Movie = Movies.filter(mov => {
        return mov.status === "Current"
      })

  return (
    <div>
      <h1>Now Showing</h1>
      
        {Movie.map((movie)=>{
            return (

                <MovieshowCase
                key={movie._id}
                movie={movie}
              />
            )
        })
        }
      <Link className="btn btn-primary mx-2" to="/booking" role="button">
        Booking
      </Link>
    </div>
  );
};

export default NowShowing;
