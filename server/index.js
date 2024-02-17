const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
console.log(process.env);
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/connectDB");

connectDB();
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/register", require("./routes/register"));

app.listen(PORT, () => console.log(`listen to port${PORT}`));
