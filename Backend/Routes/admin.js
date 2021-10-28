const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Admin = require("../Model/Admin");
var JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, password } = req.body;
      try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
          return res
            .status(400)
            .json({ error: "Please try to login using correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ error: "Please try to login using correct Credentials" });
        }
        const data = {
          admin: {
            id: admin.id,
          },
        };
        // console.log(data)
        const authtoken = JWT.sign(data, "shhhh");
        res.json(authtoken);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );

module.exports = router;
