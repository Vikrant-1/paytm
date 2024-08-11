const express = require("express");
const router = express.Router();
const app = express();
const mainRoute = require('./routes/index');

// route import
router.use('/api/v1', mainRoute);