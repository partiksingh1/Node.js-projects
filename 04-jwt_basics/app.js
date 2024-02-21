const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const app = express();

const port = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(port, console.log("listining on port........."));
  } catch (error) {
    console.log(error);
  }
};

start();
