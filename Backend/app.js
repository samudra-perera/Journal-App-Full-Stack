const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
//app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/", userRoutes);
const PORT = 2121;

mongoose
  .connect(
    "mongodb+srv://admin:Z4053A8VAzyBwXcR@cluster0.rp83e1v.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT);
    console.log(`Database is connected and IM listening on ${PORT}`);
  })
  .catch((err) => console.log(err));
