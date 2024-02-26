const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

require('dotenv').config()
const DB_URL = process.env.DB_URL || '';

const socket = require('socket.io');
const http = require('http').Server(app);
const io = socket(http);

const mongoose = require('mongoose');
mongoose.connect(DB_URL);

const userRoutes = require('./routes/UserRoutes.js');
const houseRoutes = require('./routes/HousesRoutes.js');
const messageRoutes = require('./routes/MessageRouter.js');

const MessageSchema = require('./models/Message.js');

io.on('connect', (socket)=> {
    console.log("connected")

    socket.on('message', (data) =>{
        var payload = JSON.parse(data)
        console.log(data);
        MessageSchema(payload).save().then((result)=>{
            socket.broadcast.emit('message-receipt', payload);
        }).catch((err)=>{
            console.log({"status" : "Failed", "message": "The message wasnt received"});
        })
    });

    socket.on('disconnect', (socket) =>{
        console.log("disconnect");
    });
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use((req, res, next)=>{
    res.io = io
    next()
});

app.use(router);
app.use('/user', userRoutes);
app.use('/house', houseRoutes);
app.use('/house', messageRoutes);
app.use('/uploads', express.static('uploads'));
http.listen(port, ()=>{
    console.log('listen on ' + port)
});

