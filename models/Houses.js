const mongoose = require('mongoose')

let HouseSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(address){
                let pattern = /^(Carrera|Calle|Diagonal|Transversal) \d+\w+ # \d+\w+ - \d+ \w+$/
                let test = pattern.test(address)
                return test;
            },
            message: props => `${props.value} Invalid Address!`
        }
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
    },
    image: {
        type: String,
    },
})

module.exports = mongoose.model('houses', HouseSchema)

