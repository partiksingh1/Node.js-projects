const express = require("express");
const mongoose = require("mongoose");
const app = express();
const booksRouter = require("./routes/books");
const port = 5002;

// Middleware to parse JSON
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the store");
});

// MongoDB connection string from MongoDB Atlas
const mongoURI =
  "mongodb+srv://partiktanwar30402:blabla@task-manager.nniccqt.mongodb.net/";

// Options for the MongoDB connection

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start your server or perform other actions here
    // Books route
    app.use("/api/v1/books", booksRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
