const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors=require('cors');
app.use(cors());

const userOrderRoute = require('./routes/userOrderRoute');






app.use(bodyParser());
app.use("/orders", userOrderRoute);




module.exports = app;