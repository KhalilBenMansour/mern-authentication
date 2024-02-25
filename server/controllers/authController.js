const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "user doesn't exist" });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const data = { name: user.name, email: user.email };
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ success: true, user, accessToken });
    } else {
      res.status(401).json({ message: "incorrect email or password" });
    }
  } catch (e) {
    console.log("error", e);
  }
};
module.exports = { handleLogin };
