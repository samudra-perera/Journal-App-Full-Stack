const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/', userRoutes)


mongoose.connect('mongodb+srv://admin:Z4053A8VAzyBwXcR@cluster0.rp83e1v.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            app.listen(3000);
            console.log('Database is connected and IM listening on 3000')
        }).catch((err) => console.log(err))
