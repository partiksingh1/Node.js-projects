// Assuming your Book model is defined in a file named "Book.js"
const Book = require("./model/books");
const jsonBooks = require("./data/data.json"); // Assuming you have a JSON file with book data
const { default: mongoose } = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://partiktanwar30402:prZy4lePSySgmwE1@task-manager.nniccqt.mongodb.net/"
    );

    // Assuming you have a clearBooks function to remove existing data
    await clearBooks();

    await Book.create(jsonBooks);
    console.log("Books successfully populated!");
    process.exit(0);
  } catch (error) {
    console.error("Error populating books:", error);
    process.exit(1);
  }
};

const clearBooks = async () => {
  // Assuming you have a clear method in your Book model
  await Book.deleteMany();
  console.log("Books collection cleared");
};

start();
