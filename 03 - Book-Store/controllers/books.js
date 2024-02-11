const Book = require("../model/books");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBook = async (req, res) => {
  try {
    const queryBook = req.query;
    const book = await Book.findOne({ title: queryBook.title });

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error in getting that book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const queryBookTitle = req.query.title;
    const result = await Book.deleteOne({ title: queryBookTitle });

    if (result.deletedCount > 0) {
      res.status(200).json("Deleted");
    } else {
      res.status(404).json("Book not found");
    }
  } catch (error) {
    console.error("Error in deleting that book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, country, language, pages, year, imageLink, link } =
      req.body;

    if (!title || !author || !country || !language || !pages || !year) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const book = new Book({
      title,
      author,
      country,
      language,
      pages,
      year,
      imageLink: imageLink || "",
      link: link || "",
    });

    await book.save();

    res.status(201).json({ book });
  } catch (error) {
    console.error("Error in creating book:", error);
    res
      .status(500)
      .json({ error: "Internal server error", detailedError: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title } = req.query;
    const { author, country, language, pages, year, imageLink, link } =
      req.body;

    const updatedBook = await Book.findOneAndUpdate(
      { title },
      {
        author: author || "",
        country: country || "",
        language: language || "",
        pages: pages || 0,
        year: year || 0,
        imageLink: imageLink || "",
        link: link || "",
      },
      { new: true }
    );

    if (updatedBook) {
      res.status(200).json({ book: updatedBook });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error in updating the book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllBooks, getBook, deleteBook, createBook, updateBook };
