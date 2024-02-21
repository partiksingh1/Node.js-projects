const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

// Middleware
app.use(express.static("./public")); // Serve static files from the "public" directory
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/v1/tasks", tasks); // Use the "tasks" route for API endpoints related to tasks

// Error Handling Middleware
app.use(notFound); // Handle 404 Not Found errors
app.use(errorHandlerMiddleware); // Handle other errors with the custom error handling middleware

// Environment Variable for Port
const port = process.env.PORT || 3001; // Use the specified port in the environment variable or default to 3000

// Start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.....`); // Start the server and log the port
    });
  } catch (error) {
    console.error("Error during startup:", error); // Log any errors that occur during startup
  }
};

start();
