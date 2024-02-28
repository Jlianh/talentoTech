const MessageSchema = require('../models/Message');

class MessageController {

    constructor() { }

    async sendMessage(req, res) {

        let message = MessageSchema({
            body: req.body.body,
            from: req.body.from,
            to: req.body.to
        })

        message.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({ "status": "error", "message": err.message });
        })
    }

    async getMessages(req, res, next) {
        let messages = await MessageSchema.find()
            .populate({
                path: 'from',
                select: '-password'
            })
            .populate({
                path: 'from',
                select: '-password'
            });
        res.json(messages);
    }
}

module.exports = MessageController;