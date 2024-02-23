const mongoose = require('mongoose');
const UserSchema = require('./User');
const MessageSchema = require('./Message')

const ChatSchema = new mongoose.Schema({
    from: {
        type: UserSchema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    to: {
        type: UserSchema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    message: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }],
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('chat', ChatSchema);