import React,{useContext} from "react";
import AddMovie from "./Admin/AddMovie";
import MovieItem from "./MovieItem";
import MovieContext from "../State/MovieContext";
function Home() {
  const context = useContext(MovieContext)
  const {Movies,setMovies}=context
  
  //Fetch All Moviews
  return (
    <div className="container-fluid">
      <AddMovie/>
      <div className="row mt-2">
        <div className="col-12">
          <h4>Recommanded Movies</h4>
          {Movies.map((movies) => {
           return <MovieItem key={movies._id} movie={movies} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
