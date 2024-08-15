const express = require("express");
const cors = require("cors");
const mainRoute = require("./routes/index");
const mongoose = require("mongoose");
const app = express();

// add cors and body parser
// we can also set size and type
app.use(cors());
app.use(express.json());

// route imports
const router = express.Router();

// Main route
router.use("/api/v1", mainRoute);

// Use the router in the app
app.use(router);

// Port configuration
const PORT = process.env.PORT || 8000;

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  mongoose.connect("mongodb://localhost:27017/paytm")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
});
