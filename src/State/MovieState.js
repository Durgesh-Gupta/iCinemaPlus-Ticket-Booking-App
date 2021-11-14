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
    console.log("json", json);
  };
  //Add Movies
  // const addMovie = async (title,image, description, release_date, genre) => {
  const addMovie = async (formData) => {
    console.log("formData", formData);
    console.log(formData.has("imagoe"));

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
    console.log(movie, "-----Movie");
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
    console.log(json);

    const newMovie = Movies.filter((movie) => {
      return movie._id !== id;
    });
    setMovies(newMovie);
  };

  //Edit Movie
  const editMovie = async (id, title, description, genre, release_date) => {
    console.log(
      "id,title,description,status,genre,release_date",
      id,
      title,
      description,
      genre,
      release_date
    );
    //API CALL
    const response = await fetch(`${host}/api/movies/updatemov/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("Authtoken"),
      },
      body: JSON.stringify({ title, description, genre, release_date }),
    });
    const json = await response.json();
    // console.log(json);

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
    console.log("seat_arr", seat_arr);
    console.log("shotime", showtime);
    for (let index = 0; index < seat_arr.length; index++) {
      //API CAll
      const response = await fetch(`${host}/api/booking/select`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YWE3Nzg5MjRjOGViY2Q2N2VhYjQxIn0sImlhdCI6MTYzNjU0NDU5N30.J9zcTMil4Ib85GwAaBwrTrSEGYcL1oosE24yVc04190",
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
    console.log(user);
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
    console.log("stete", id);

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
    //   console.log("AllDetails", AllDetails);
    //   console.log("json", json);
    // if (AllDetails) {
    //   const tempmov = AllDetails.movies;
    //   tempmov.map((mov) => {
    //     console.log("mov", mov);
    //     setMovIdName(...MovIdName, { id: mov._id, title: mov.title });
    //   });
    // }
    console.log("movidname", MovIdName);
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
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
