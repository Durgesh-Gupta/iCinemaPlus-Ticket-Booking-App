import React,{useContext,useEffect} from 'react'
import MovieContext from "../State/MovieContext";
import MovieshowCase from "./MovieshowCase";


const ComingSoon = () => {
  const context = useContext(MovieContext);
  const { Movies ,getMovies} = context;
  //Fetch All Moviews
  useEffect(() => {
    getMovies();
  }, []);

//   filter Mov
const commingMov=Movies.filter((mov)=>{
    return mov.status=="Coming Soon"
})


    return (
        <div className="container">
            <h1>Coming Soon</h1>
            <div className="row">
          {commingMov.map((movies) => {
            return (
              <MovieshowCase
                key={movies._id}
                movie={movies}
              />
            );
          })}
          </div>

        </div>
    )
}

export default ComingSoon
