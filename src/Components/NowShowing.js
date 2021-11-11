import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MovieContext from "../State/MovieContext";
import MovieshowCase from "./MovieshowCase";
import Pagination from "./Pagination";

const NowShowing = () => {
  const context = useContext(MovieContext);
  const { Movies } = context;
  const [Search, setSearch] = useState("");
  var Movie = Movies.filter((mov) => {
    if (Search == "") {
      return mov.status === "Current";
    } else if (mov.title.toLowerCase().includes(Search.toLowerCase())) {
      console.log(mov.title.toLowerCase().includes(Search.toLowerCase()));
      return mov.status === "Current";
    }
  });
  //For not find searched movie
  // if (
  //   !(
  //     Object.keys(Movie).length === 0 &&
  //     Movie.constructor === Object
  //   ) && Search!=""
  // ) {
  //   return(<div><h1>Not Found</h1></div>)
  // }

  const SearchHandle = (e) => {
    setSearch(e.target.value);
    console.log(Search);
  };

  //Paginamtion
  const [currentPage, setcurrentPage] = useState(1);
  const [MovPerPage, setMovPerPage] = useState(1);

  const indexOfLast = currentPage * MovPerPage;
  const indexOfFirst = indexOfLast - MovPerPage;
  const currentMovie = Movie.slice(indexOfFirst, indexOfLast);
  //Change Page
  const paginate=(pageNo)=>{
    setcurrentPage(pageNo)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1>Now Showing</h1>
        </div>
        <div className="col-3 pt-3">
          <input
            className="form-control form-control-sm"
            value={Search}
            onChange={SearchHandle}
            type="text"
            placeholder="Search Movie..."
          />
        </div>
      </div>

      <div className="row">
        {currentMovie.map((movie) => {
          return (
            <div key={movie._id} className="col-md-4">
              <MovieshowCase movie={movie} />
            </div>
          );
        })}
      </div>
      <div className="row">
      <div className="col-12">
        <h1>Hello</h1>
      <Pagination MovPerPage={MovPerPage} totalMov={Movie.length} paginate={paginate}/>

      </div>
      </div>
    </div>
  );
};

export default NowShowing;
