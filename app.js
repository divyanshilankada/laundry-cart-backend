const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors=require('cors');
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());


const userOrderRoute = require('./routes/userOrderRoute');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');





app.use(bodyParser());
app.use("/orders", userOrderRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);




module.exports = app;