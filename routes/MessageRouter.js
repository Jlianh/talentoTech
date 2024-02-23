const express = require('express');
const router = express.Router();

const MessageSchema = require('../models/Message');

router.post('/sendMessage', async (req, res) => {
    let message = MessageSchema({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to
    })

    message.save().then((result)=>{
        res.send(result);
    }).catch((err) =>{
        res.send({"status": "error", "message" : err.message});
    })
});

router.get('/getMessages', async (req, res) => {
    let messages = await MessageSchema.find()
    .populate({
        path: 'from',
        select: '-password'})
    .populate({
        path: 'from',
        select: '-password'
    });
    res.json(messages);
});

module.exports = router;