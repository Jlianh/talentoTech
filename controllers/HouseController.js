const HouseSchema = require('../models/Houses')

const Utils = require('../utils/Utils')
const utils = new Utils();

class HouseController {

    constructor() { }

    async getHouses(req, res, next) {
        let houses = await HouseSchema.find();
        res.json(houses)
    }

    async getHousesById(req, res) {
        let houses = await HouseSchema.findById(req.params.id);
        res.json(houses)
    }

    async addHouse(req, res) {

        var code = utils.generateCode()

        var house = HouseSchema.findOne(code);

        if(!house){
            code = utils.generateCode();
        } else {
            let house = HouseSchema({
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                size: req.body.size,
                type: req.body.type,
                zipCode: req.body.zipCode,
                rooms: req.body.rooms,
                bathrooms: req.body.bathrooms,
                parking: req.body.parking,
                price: req.body.price,
                code: code,
            })
    
            house.save().then((result) => {
                res.send(result)
            }).catch((err) => {
                console.log(err)
                res.json({ "status": "failed", "message": "Error creating the house" });
            });
        }
    }

    async editHouse(req, res) {
        var id = req.params.id;

        var updatedHouse = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            size: req.body.size,
            type: req.body.type,
            zipCode: req.body.zipCode,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            parking: req.body.parking,
            price: req.body.price,
            code: req.body.code,
        };

        HouseSchema.findByIdAndUpdate(id, updatedHouse, { new: true }).then((result) => {
            res.send(result)
        }).catch((error) => {
            res.status(400).send({ "status": "failed", "message": "Updating house error" })
        });
    }

    async deleteHouse(req, res) {
        var id = req.params.id;

        HouseSchema.findByIdAndDelete({ _id: id }).then(() => {
            res.status(200).json({ "status": "success", "message": "House deleted successfully" });
        }).catch((error) => {
            res.status(200).json({ "status": "failed", "message": "Error deleting house" });
        });
    }
}

module.exports = HouseController;