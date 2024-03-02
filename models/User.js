const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    identification: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(email){
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return regex.test(email);
            },
            message: props => `${props.value} no es un correo electrónico válido!`
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
})

module.exports = mongoose.model('user', UserSchema)