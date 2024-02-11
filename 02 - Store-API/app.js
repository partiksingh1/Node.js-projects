require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const productsRouter = require("./routes/products");
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>store API</h1><a href="/api/v1/products">products routes</a>');
});
//products routes

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listining on port ${port}.........`));
  } catch (error) {
    console.log(error);
  }
};

start();
