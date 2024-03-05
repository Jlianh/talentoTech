const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

require('dotenv').config()
const DB_URL = process.env.DB_URL || '';

const socket = require('socket.io');
const http = require('http').Server(app);
const io = socket(http);

const { createYoga } = require('graphql-yoga');
const schema = require('./graphql/schema.js')

const mongoose = require('mongoose');
mongoose.connect(DB_URL);

const cors = require('cors')

const userRoutes = require('./routes/UserRoutes.js');
const authRouter = require('./routes/AuthRouter.js');
const houseRoutes = require('./routes/HousesRoutes.js');
const messageRoutes = require('./routes/MessageRouter.js');
const departamentRoute = require('./routes/DepartamentRoute.js');


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

const yoga = new createYoga({ schema });
app.use('/graphql', yoga);

app.use(cors())

app.use(router);
app.use('/user', userRoutes);
app.use('/auth', authRouter);
app.use('/house', houseRoutes);
app.use('/message', messageRoutes);
app.use('/departament', departamentRoute);
app.use('/uploads', express.static('uploads'));
http.listen(port, ()=>{
    console.log('listen on ' + port)
});

module.exports = http