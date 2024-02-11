require("dotenv").config();

const connectDB = require("./db/connect");
const jsonProducts = require("./products.json");
const Product = require("./models/products");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.create(jsonProducts);
    console.log("success!!!!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
