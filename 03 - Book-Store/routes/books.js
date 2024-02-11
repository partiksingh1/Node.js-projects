const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBook,
  deleteBook,
  createBook,
  updateBook,
} = require("../controllers/books");

router.get("/static", getAllBooks);
router.get("/", getBook);
router.delete("/", deleteBook);
router.post("/", createBook);
router.patch("/", updateBook);

module.exports = router;
