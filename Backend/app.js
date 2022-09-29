const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();
require('dotenv').config()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
//app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/", userRoutes);
mongoose
  .connect(
    process.env.DB_STRING
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Database is connected and IM listening on ${process.env.PORT}`);
  })
  .catch((err) => console.log(err));
