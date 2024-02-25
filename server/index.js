const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/connectDB");
const { verifyJWT } = require("./middleware/verifyJWT");

connectDB();
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.get("/users", verifyJWT, async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
});

app.listen(PORT, () => console.log(`listen to port${PORT}`));
