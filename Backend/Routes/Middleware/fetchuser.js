var JWT = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please add authentication token" });
  }
  try {
    const data = JWT.verify(token, "shhhh", function(err, decoded) {
      if (err) {
        res.status(401).send({ error: "Token Expire! Please Login Again" });

      }
    })
    req.user = data.user;
    next();
  } 
  catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
