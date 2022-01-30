const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Admin = require("../Model/User");
var JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../Model/User");
const Movies = require("../Model/Movies");
const Theater = require("../Model/Theater");
const ShowTime = require("../Model/showtime");
const Reservation = require("../Model/Reservation");
const adminauth = require("./Middleware/adminauth");
const Seats = require("../Model/Seats");


router.post(
  "/Admincreate",
  [body("username").isLength({min:3}), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    
    let admin = await Admin.findOne({ username: req.body.username });
    if (admin) {
      return res
        .status(400)
        .json({ error: "Sorry a username is already taken already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);

    admin = await Admin.create({
        username: req.body.username,
        password: secPass,
      });
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authtoken = JWT.sign(data, "shhhh");
      res.json(authtoken);
}
);

//Authenticate 
router.post(
    "/login",
    [body("username").isLength({min:3}), body("password").exists()],
    async (req, res) => {
      var success=false
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
  
      const { username, password } = req.body;
      try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
          return res
            .status(400)
            .json({success, error: "Please try to login using correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ success,error: "Please try to login using correct Credentials" });
        }
        const data = {
          admin: {
            id: admin.id,
          },
        };
        // console.log(data)
        const authtoken = JWT.sign(data, "shhhh");
        success=true
        res.json({success,authtoken});
      } catch (error) {
        console.error(error.message);
        res.status(500).send(" HEre Internal Server Error");
      }
    }
  );

  // Route for All Details Admin Dashboard
  router.post("/adminDetails", adminauth,async (req, res) => {
    // All Details
    const mov=await Movies.find()
    // console.log(mov.length)
    const user = await User.find().select("-password");
    // console.log(user)
    const reser=await Reservation.find()
    const showtime=await ShowTime.find()
    const seats=await Seats.find()
    console.log("seats",seats)


    res.json({movies:mov,users:user,reservations:reser,showtimes:showtime,seats:seats});
  });

module.exports = router;
