const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Movies = require("../Model/Movies");
const Theater = require("../Model/Theater");
const ShowTime = require("../Model/showtime");
const Reservation = require("../Model/Reservation");
const adminauth = require("./Middleware/adminauth");
const Seats = require("../Model/Seats");
const multer = require("multer");

//Storage for images
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images");
  },
  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
//upload parameter for multer
const upload = multer({
  storage: storage,
});

//Router 1: Adding Movies at admin side
router.post(
  "/addmov",
  upload.single("image"),
  adminauth,
  [
    body("title", "Enter Valid Tital for Movie").isLength({ min: 2 }),
    body("description", "Enter valid Desc for Movies!").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // try{
    // const { title } = req.body;
    const { title, description, genre, release_date } = req.body;
    // console.log("title, description, genre, release_date",title)
    try {
      var image = req.file.filename;
      // console.log();
    } catch {
      image = "Empty";
    }
    // console.log(req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let movies = await Movies.findOne({ title: req.body.title });
    if (movies) {
      return res.status(400).json({ error: "Sorry Movie already exists" });
    }
//Movies Status Logic
    var status=""
    const Today = new Date();
    const rd = new Date(release_date);
    if (Today < rd) {
      status = "Coming Soon";
    } else {
      status = "Current";
    }
    const movie = new Movies({
      title,
      description,
      genre,
      status,
      image,
      release_date,
    });
    const saveMovie = await movie.save();
    // console.log(movie)
    // res.send("done");
    res.send(saveMovie);
    // }
    // catch(error){
    // res.status(200).send("!!! need to fix in Add Movie Route");
    // }
  }
);

//Route 2:Update Movie Details -Admin side
router.put("/updatemov/:id", adminauth, async (req, res) => {
  const { title, description, genre, status, release_date } = req.body;
  const newMovie = {};
  if (title) {
    newMovie.title = title;
  }
  if (description) {
    newMovie.description = description;
  }
  if (genre) {
    newMovie.genre = genre;
  }
  if (status) {
    newMovie.status = status;
  }
  if (release_date) {
    newMovie.release_date = release_date;
  }

  //Find the movie
  let movie = await Movies.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("Movie Not Found");
  }

  //updeate the value
  movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      $set: newMovie,
    },
    { new: true }
  );

  res.json({ movie });
});
//Route 3:Delete Movie  -Admin side

router.put("/deletemov/:id", adminauth, async (req, res) => {
  //Find the movie
  let movie = await Movies.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("Movie Not Found");
  }

  //Deleting movies
  movie = await Movies.findByIdAndUpdate(req.params.id, {
    IS_DELETE: true,
  });

  res.json({ Success: "Movie deleted", movie });
});

//Route 4: Get All Movies
router.get("/allmovies", async (req, res) => {
  const movies = await Movies.find({ IS_DELETE: false }).exec();
  res.json(movies);
});

//Router :ADDING Theater Names
router.post("/createthea", adminauth, (req, res) => {
  const theater = Theater(req.body);
  theater.save();
  res.send(req.body);
});

//Router :Getting Movie Booking Details
router.post("/bookingDetails", async (req, res) => {
  var { id } = req.body;
  const movies = await Movies.findById(id);
  console.log(movies, "______Movie___________");
  const showtime = await ShowTime.find({ movie: id });

  // const reserved= await Reservation.find({showtime:showtime._id})
  console.log(showtime.length);
  const showTime_id = [];
  const ShowIdTimeTheater = [];
  for (let index = 0; index < showtime.length; index++) {
    showTime_id.push(showtime[index].id);
    ShowIdTimeTheater.push({
      id: showtime[index].id,
      Time: showtime[index].time,
      theater: showtime[index].theater,
    });
  }
  console.log(ShowIdTimeTheater);
  const reserved = await Reservation.find({
    showtime: { $in: showTime_id },
  });
  const seat = await Seats.find({
    showtime: { $in: showTime_id },
  });
  const seat_Array = [];
  for (let index = 0; index < seat.length; index++) {
    seat_Array.push({
      ShowTime: seat[index].showtime,
      seatNo: seat[index].seat_no,
    });
  }
  // console.log(seat_Array)
  //Refcatoring value
  //for Movies
  const movie_id = movies._id;
  const { title, image, description, genre } = movies;
  // console.log(movie_id,title,description,genre)
  //for showtime
  //for reservation
  // const show_time=reserved.showtime
  // const {seat_no}=reserved
  const newRes = {
    movie_id,
    image,
    title,
    description,
    genre,
    showTime_id,
    seat_Array,
    ShowIdTimeTheater,
  };

  // console.log(newRes)
  res.send(newRes);
});

module.exports = router;
