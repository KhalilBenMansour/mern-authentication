const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected db");
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectDB;
