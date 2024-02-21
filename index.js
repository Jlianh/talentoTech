const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

require('dotenv').config()
const DB_URL = process.env.DB_URL || '';

const mongoose = require('mongoose');
mongoose.connect(DB_URL);

const userRoutes = require('./routes/UserRoutes.js');
const houseRoutes = require('./routes/HousesRoutes.js');

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(router);
app.use('/user', userRoutes);
app.use('/house', houseRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(port, ()=>{
    console.log('listen on ' + port)
});

