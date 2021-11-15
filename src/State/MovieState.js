import { useState } from "react";
import MovieContext from "./MovieContext";
import { useHistory } from "react-router-dom";

const MovieState = (props) => {
  const host = "http://localhost:5000";
  const initial = [];
  const [Movies, setMovies] = useState(initial);
  const [BookingDetails, setBookingDetails] = useState({});
  let history = useHistory();

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
  const addMovie = async (formData) => {
    
    //Api Request
    const response = await fetch(`${host}/api/movies/addmov`, {
      method: "POST",
      headers: {
        // "content-type": "application/json",
        "auth-token": localStorage.getItem("Authtoken"),
      },
      body: formData,
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
        "auth-token": localStorage.getItem("Authtoken"),
      },
    });
    const json = await response.json();
    console.log(json);

    const newMovie = Movies.filter((movie) => {
      return movie._id !== id;
    });
    setMovies(newMovie);
  };

  //Edit Movie
  const editMovie = async (id, title, description, genre, release_date) => {
    // console.log(
    //   "id,title,description,status,genre,release_date",
    //   id,
    //   title,
    //   description,
    //   genre,
    //   release_date
    // );
    //API CALL
    const response = await fetch(`${host}/api/movies/updatemov/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("Authtoken"),
      },
      body: JSON.stringify({ title, description, genre, release_date }),
    });
    const json = await response.json();
    console.log(json);

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

  // Get Movies Booking Details
  const fetchBooking = async (id) => {
    const response = await fetch(`${host}/api/movies/bookingDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    setBookingDetails(json);
  };

  //Ticket Booking Request
  const TicketBooking = async (showtime, seat_arr) => {
    
    for (let index = 0; index < seat_arr.length; index++) {
      //API CAll
      const response = await fetch(`${host}/api/booking/select`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ showtime, seat_no: seat_arr[index] }),
      });
      const json = await response.json();
      console.log(json);
      {
        alert("Ticket Booked!!!");
      }
    }
  };

  //  User Related States
  const [UserDetail, setUserDetail] = useState("");

  const createUser = async (User) => {
    const { name, email, contact, password } = User;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, contact, password }),
    });

    const user = await response.json();
    if (user) {
      // Save the auth token and redirect
      localStorage.setItem("token", user.authtoken);
      history.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  // Login User Details
  const UserDetails = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log("json",json)
    setUserDetail(json);
  };

  //Ticket Cancel
  const TicketCancel = async (id) => {

    //API CAll
    const response = await fetch(`${host}/api/booking/cancel/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    // }
  };

  // Get All Details Require for Admin
  var [AllDetails, setAllDetails] = useState("");
  const [MovIdName, setMovIdName] = useState([]);
  const [showtime, setshowtime] = useState([]);

  const AdminDetails = async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/adminDetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("Authtoken"),
        },
      }
    );
    const json = await response.json();
    setAllDetails(json);
    const temshow = await json;
    setshowtime(temshow.showtimes);
  };

  // Deleting ShowTime
  const deleteShow = async (id) => {
    //API CAll
    const response = await fetch(`${host}/api/show/deleteshow/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("Authtoken"),
      },
    });
    const json = await response.json();

    console.log(json);

    const newshow = showtime

    let objIndex = newshow.findIndex((obj) => obj._id == id);
    console.log("Object",objIndex)
 
    //Update object's name property.
    newshow[objIndex].IS_DELETE = true;
    console.log("New Show Value",newshow)
    setshowtime(newshow);
  };
  // Deleting User
  const deleteUser = async (id) => {
    //API CAll
    const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("Authtoken"),
      },
    });
    const json = await response.json();
    console.log(json);

 
  };

  // Update ShowTime
  const updateShowTime = async ({ id, time }) => {
    console.log("id time", id, time);

    //API CALL
    const response = await fetch(`${host}/api/show/updateShow/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("Authtoken"),
      },
      body: JSON.stringify({ time }),
    });
    const json = await response.json();
    console.log(json);

  };

  // Update User
  const updateUserd = async ({ id, name, contact, email }) => {
    //API CALL
    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("Authtoken"),
      },
      body: JSON.stringify({ name, contact, email }),
    });
    const json = await response.json();
    console.log(json);

  };

  // Add Showtime
  const addShowtime = async ({ movie, theater, time }) => {
    console.log("check in state", movie, theater, time);

    //Api Request
    const response = await fetch(`${host}/api/show/createShow`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // "auth-token": localStorage.getItem("Authtoken"),
      },
      body: JSON.stringify({ movie, theater, time }),
    });

    const newshow = await response.json();
    console.log("New Show", newshow);
  };

  return (
    <MovieContext.Provider
      value={{
        Movies,
        setMovies,
        getMovies,
        addMovie,
        deleteMovie,
        editMovie,
        fetchBooking,
        BookingDetails,
        TicketBooking,
        createUser,
        UserDetails,
        UserDetail,
        TicketCancel,
        AdminDetails,
        AllDetails,
        MovIdName,
        deleteShow,
        deleteUser,
        updateShowTime,
        updateUserd,
        addShowtime,
        showtime,
        setshowtime,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
