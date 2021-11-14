import React, { useContext } from "react";
import MovieContext from "../../State/MovieContext";

const AddShowtime = () => {
  const context = useContext(MovieContext);
  const { AllDetails } = context;
  const tempmov={}
  if (AllDetails) {
    AllDetails.movies.map((mov) => {
      tempmov[mov._id]=mov.title;
    });
    console.log(tempmov)
  }
  const showtime = AllDetails.showtimes;
  return (
    <div>
      <h1>Showtime</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Movie</th>
            <th scope="col">Theater</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {showtime.map((st) => {
            return (
              <tr key={st._id}>
                <th scope="row"></th>
                <td>{tempmov[st.movie]}</td>
                <td>{st.theater}</td>
                <td>{st.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddShowtime;
