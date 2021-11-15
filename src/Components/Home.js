import React, { useState,useContext, useEffect, useRef } from "react";
import AddMovie from "./Admin/AddMovie";
import MovieItem from "./MovieItem";
import MovieContext from "../State/MovieContext";
import MovieshowCase from "./MovieshowCase";
function Home() {
  const context = useContext(MovieContext);
  const { Movies, getMovies,editMovie } = context;

  //Fetch All Moviews
  useEffect(() => {
    getMovies();
  }, []);

  //   filter Mov
const NotDele=Movies.filter((mov)=>{
  return mov.IS_DELETE==false
})

  return (
    <div className="container-fluid">
    
      <div className="row mt-2">
        <div className="col-12">
          <h4>Recommanded Movies</h4>
          <div className="row">
          {NotDele.map((movies) => {
            return (
              <MovieshowCase
                key={movies._id}
                movie={movies}
              />
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
