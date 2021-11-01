import React, { useState } from "react";
import MovieItem from "./MovieItem";
// import axios from "../axios";
function Home() {

  //Fetch All Moviews
  const movie = [
    {
      _id: "617aaa79924c8ebcd67eab4f",
      title: "Avengers",
      description: "Marvel Cinematic Universe",
      genre: "Action,comic",
      status: "Comming Soon",
      release_date: "2020-07-10T00:00:00.000Z",
      __v: 0,
      IS_DELETE: true,
    },
    {
      _id: "617bb1bccad30c852e3eba1a",
      title: "One Piece",
      description: "Pirates adventure",
      genre: "Action,comic",
      status: "Comming Soon",
      release_date: "2020-02-10T00:00:00.000Z",
      IS_DELETE: false,
      __v: 0,
    },
  ];
  const [Movies, setMovies] = useState(movie);
  return (
    <div className="container-fluid">
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
