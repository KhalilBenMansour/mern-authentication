const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const handleNewUser = async (req, res) => {
  const user = req.body;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  // If validation fields failed
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  try {
    // Search for user in database by email which is unique
    const userdb = await User.findOne({ email: req.body.email });

    // If user already exists, send a 403 Forbidden response
    if (userdb) {
      return res.status(409).json({ message: "User email already exists" });
    }
    // If user doesn't exist, proceed with user registration
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await User.create(user);
    return res.status(201).json({ message: "User registered" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

module.exports = { handleNewUser };
