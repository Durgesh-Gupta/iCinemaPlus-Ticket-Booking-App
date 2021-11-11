import React from "react";

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
      <ul class="pagination">
        {pageNumber.map((number) => {
          return (
            <li key={number} class="page-item">
              <a class="page-link" onClick={()=>paginate(number)} href="#">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
