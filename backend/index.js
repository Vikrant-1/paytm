const express = require("express");
const cors = require("cors");
const app = express();

// add cors and body parser
// we can also set size and type
app.use(cors());
app.use(express.json());

// route imports
const router = express.Router();
const mainRoute = require("./routes/index");

// main route
router.use("/api/v1", mainRoute);

app.listen(3000);
