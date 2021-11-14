const express = require("express");
const router = express.Router();

const adminauth =require("./Middleware/adminauth")
const ShowTime = require("../Model/showtime");
const Movies = require("../Model/Movies");
const Theater = require("../Model/Theater");
const { body, validationResult } = require("express-validator");

//Create Showtime
router.post("/createShow", async (req, res) => {
  //validation
  //Create
  const { movie, theater, time } = req.body;
  let movies = await Movies.findOne({ movie });
  if (!movies) {
    return res.status(400).json({ error: "Sorry Movie not exists" });
  }
  let theaters = await Theater.findOne({ theater });
  if (!theaters) {
    return res.status(400).json({ error: "Sorry Theater not exists" });
  }
  // let shows = await ShowTime.findOne({ time });
  // if (!shows) {
  //   return res
  //     .status(400)
  //     .json({ error: "Sorry this Show time is not Available" });
  // }

  const show = new ShowTime({ movie, theater, time });
  const SaveShow = await show.save();
  res.send(SaveShow);
});
//Update Show Time
router.put("/updateShow/:id", async (req, res) => {
  const { movie, theater, time } = req.body;
  const newShow = {};
  if (movie) {
    newShow.movie = movie;
  }
  if (theater) {
    newShow.theater = theater;
  }
  if (time) {
    newShow.time = time;
  }

  //updeate the value
  Show = await ShowTime.findByIdAndUpdate(
    req.params.id,
    {
      $set: newShow,
    },
    { new: true }
  );

  res.json({ Show });
});
// Delete Showtime
router.put("/deleteshow/:id", adminauth, async (req, res) => {
  //Find the movie
  let show = await ShowTime.findById(req.params.id);
  if (!show) {
    return res.status(404).send("Show Not Found");
  }

  //Deleting Show
  show = await ShowTime.findByIdAndUpdate(req.params.id ,{
   IS_DELETE:true
  }
);

  res.json({ Success: "Show is deleted", show });
});
module.exports = router;
