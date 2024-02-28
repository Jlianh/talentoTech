const express = require('express');
const messageRouter = express.Router();

const MessageController = require('../controllers/MessageController')

const messageController = new MessageController()

messageRouter.post('/sendMessage', messageController.sendMessage);

messageRouter.get('/getMessages', messageController.getMessages);

module.exports = messageRouter;