import React from "react";


const Pagination = ({ MovPerPage, totalMov,paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalMov / MovPerPage); i++) {
    // console.log("i", i);
    pageNumber.push(i);
  }
 
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
