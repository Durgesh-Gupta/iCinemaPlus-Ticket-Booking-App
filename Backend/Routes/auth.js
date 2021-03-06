const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const User = require("../Model/User");
var JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authTable = require("../Model/AuthTable");
const Reservation = require("../Model/Reservation");
const fetchuser = require("./Middleware/fetchuser");
const adminauth = require("./Middleware/adminauth");
const Seats = require("../Model/Seats");
const ShowTime = require("../Model/showtime");
const Movies = require("../Model/Movies");




//Creating User
router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = JWT.sign({ data }, "shhhh", { expiresIn: "7d" });
    const authT = new authTable({ user: data.user.id, token: authtoken });
    const saveAuth = await authT.save();

    res.json({ authtoken, saveAuth });
  }
);
//Authenticate User
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    var success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: "Email Please try to login using correct Credentials",
          });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Password Please try to login using correct Credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = JWT.sign(data, "shhhh");
      success = true;
      res.json({ success, authtoken });
      console.log({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Update User Details
router.put("/updateuser/:id", adminauth, async (req, res) => {
  const { name, email, contact } = req.body;
  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  if (email) {
    newUser.email = email;
  }
  if (contact) {
    newUser.contact = contact;
  }
  //find the user and update
  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: newUser,
    },
    {
      new: true,
    }
  );
  res.json(user);
});

//Delete user
router.put("/deleteuser/:id", adminauth, async (req, res) => {
  user = await User.findByIdAndUpdate(req.params.id, { IS_DELETE: true });

  res.json({ Success: "User Deleted deleted", user });
});

//Routes for User Details in Dashboard
//GetUser details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    const reservation = await Reservation.find({user:userId})
    const showTime_id=[]
    for (let index = 0; index < reservation.length; index++) {
        showTime_id.push(reservation[index].showtime);
        var seat=await Seats.find({id:reservation[index].seat_no})
        console.log(seat)
    }

    

    // console.log(showTime_id)
    // const showtime=await ShowTime.find({})
    // console.log(reservation)
    const MovTimeSeat_no=[]
    // for(let index=0;index<reservation.length;index++){

    // }

  

    res.status(200).send({user,reservation,seat});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server My end Error");
  }
});

module.exports = router;
