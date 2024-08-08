const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors);
app.use(express.json());

// route imports
const mainRouter = require("./routes/index");

// routes
app.use("/api/v1", mainRouter);

app.listen(3000);