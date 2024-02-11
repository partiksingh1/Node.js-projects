// Example Book model definition
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  country: String,
  language: String,
  pages: Number,
  year: Number,
  imageLink: String,
  link: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
