import React from "react";
import { Link } from "react-router-dom";


const Pagination = ({ MovPerPage, totalMov,paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalMov / MovPerPage); i++) {
    // console.log("i", i);
    pageNumber.push(i);
  }
  pageNumber.map((num) => {
    // console.log("map", num);
  });
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageNumber.map((number) => {
          return (
            <li key={number} className="page-item">
              <span className="page-link" onClick={()=>paginate(number)} >
                {number}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
