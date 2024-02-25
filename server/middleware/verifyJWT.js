const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    console.log(decoded);
    next();
  });
  //   const decoded = jwt.verify(accessToken, "secrret");
};
module.exports = { verifyJWT };
