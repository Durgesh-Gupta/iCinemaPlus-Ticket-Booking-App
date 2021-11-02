const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Movies = require("../Model/Movies");
const Theater = require("../Model/Theater");
const adminauth = require("./Middleware/adminauth");
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
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

//Router 1: Adding Movies at admin side
router.post(
  "/addmov",
  upload.single("image"),
  adminauth,
  [
    body("title", "Enter Valid Tital for Movie").isLength({ min: 2 }),
    body("description", "Enter valid Desc for Movies!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.formData);
    const { title, description, genre, release_date, status } = req.body;
    const { image } = req.file.filename;
    console.log(title);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let movies = await Movies.findOne({ title: req.body.title });
    if (movies) {
      return res.status(400).json({ error: "Sorry Movie already exists" });
    }

    const movie = new Movies({
      title,
      description,
      genre,
      status,
      release_date,
      image,
    });
    movie.save();
    // const saveMovie = await movie.save();
    // res.send(saveMovie);
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

module.exports = router;
