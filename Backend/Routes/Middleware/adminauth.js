var JWT = require("jsonwebtoken");
const adminauth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please add Admin authentication token" });
  }
  try {
    const data = JWT.verify(token, "shhhh");
    req.admin = data.admin;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = adminauth;
