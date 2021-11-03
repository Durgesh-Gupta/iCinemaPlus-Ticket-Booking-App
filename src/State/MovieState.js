import { useState } from "react";
import MovieContext from "./MovieContext";

const MovieState = (props) => {
  const host = "http://localhost:5000";
  const initial = [];
  const [Movies, setMovies] = useState(initial);

  // Get Movies
  const getMovies = async () => {
    const response = await fetch(`${host}/api/movies/allmovies`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    setMovies(json);
  };
  //Add Movies
  // const addMovie = async (title,image, description, release_date, genre) => {
  const addMovie = async (formData) => {
    console.log(formData);

    //Movies Model Status Logic
    // var statusid=""
    // const Today = new Date();
    // const rd = new Date(release_date);
    // if (Today < rd) {
    //    statusid = "Coming Soon";
    // } else {
    //    statusid = "Current";
    // }
    //Api Request
    const response = await fetch(`${host}/api/movies/addmov`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYxNzdlNzE5YjY3NWY3ODFkOWM2Mzc1NCJ9LCJpYXQiOjE2MzU3NzIyOTN9.JTb-sINP8sXKpJ7Bc2rCLVVDejeUla3gGFOH9yS6vAM",
      },
      body:formData,
    });

    const movie = await response.json();
    setMovies(Movies.concat(movie));

  };

  //Delete Movies
  const deleteMovie = async (id) => {
    //API CAll
    const response = await fetch(`${host}/api/movies/deletemov/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYxNzdlNzE5YjY3NWY3ODFkOWM2Mzc1NCJ9LCJpYXQiOjE2MzU3NzIyOTN9.JTb-sINP8sXKpJ7Bc2rCLVVDejeUla3gGFOH9yS6vAM",
      },
    });
    const json = await response.json();
    console.log(json)

    const newMovie = Movies.filter((movie) => {
      return movie._id !== id;
    });
    setMovies(newMovie);
  };

  //Edit Movie
  const editMovie = async (
    id,
    title,
    description,
    status,
    genre,
    release_date
  ) => {
    //API CALL
    const response = await fetch(`${host}/api/movies/updatemov/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYxNzdlNzE5YjY3NWY3ODFkOWM2Mzc1NCJ9LCJpYXQiOjE2MzUzMzg4OTJ9.uEQqtnUxK4pPVXiXLFWS8KR9Ji62w6xzqKYrtK7Lp_E",
      },
      body: JSON.stringify({ title, description, status, genre, release_date }),
    });
    const json = await response.json();
    console.log(json)

    let newMovie = JSON.parse(JSON.stringify(Movies));

    for (let index = 0; index < newMovie.length; index++) {
      const element = newMovie[index];
      if (element._id === id) {
      newMovie[index].title = title;
      newMovie[index].description = description;
      newMovie[index].release_date = release_date; 
      newMovie[index].genre = genre; 
        break; 
      }
    }  
    setMovies(newMovie);


  };

  return (
    <MovieContext.Provider
      value={{ Movies, setMovies, getMovies, addMovie, deleteMovie, editMovie}}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
