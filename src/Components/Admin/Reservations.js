import React,{useContext} from 'react'
import MovieContext from "../../State/MovieContext";


const Reservations = () => {
    const context = useContext(MovieContext);
    const { AllDetails } = context;
    var tempmov={}
    var tempuser={}
    var tempshow={}
    var tempseat={}
    var tempShowToMov={}

    if (AllDetails) {
        AllDetails.movies.map((mov) => {
          tempmov[mov._id]=mov.title;
        });
        AllDetails.users.map((user) => {
          tempuser[user._id]=user.name;
        });
        AllDetails.showtimes.map((st) => {
          tempshow[st._id]=st.time;
          tempShowToMov[st._id]=st.movie
        });
        AllDetails.seats.map((st) => {
          tempseat[st._id]=st.seat_no;
        });
      }
      const reservation=AllDetails.reservations
      console.log(reservation)

    return (
        <div>
        <h1>Reservations</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Movie</th>
              <th scope="col">User</th>
              <th scope="col">Time</th>
              <th scope="col">Seat</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((reser) => {
              return (
                <tr key={reser._id}>
                  <th scope="row"></th>
                  <td>{tempmov[tempShowToMov[reser.showtime]]}</td>
                  <td>{tempuser[reser.user]}</td>
                  <td>{tempshow[reser.showtime]}</td>
                  <td>{tempseat[reser.seat_no]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}

export default Reservations
