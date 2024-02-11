const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log("DB is connected...");
  });
};

module.exports = connectDB;
