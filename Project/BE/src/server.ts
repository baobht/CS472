import app from "./app";
import config from "./config";
import connectDB from "./config/db";

// Initialize the database connection and start the server
connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if database connection fails
  });
