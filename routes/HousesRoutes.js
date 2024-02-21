const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer')

const UserController = require('../controllers/UserController')
const userController = new UserController();

const HouseSchema = require('../models/Houses');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/houses/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    } else {
        cb(new Error('The file isnt a image'));
    }

}

const upload = multer({storage: storage, fileFilter: fileFilter});

router.post('/addHouse/', upload.single('file'), async (req, res) => {
    
    var characters = '';
    var numbers = '';
    var numbersList = '1234567890'
    var charactersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * numbersList.length);
        characters += numbersList.charAt(randomIndex);
    }

    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * charactersList.length);
        numbers += charactersList.charAt(randomIndex);
    }

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
        code: characters+numbers,
    })

    house.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.json({ "status": "failed", "message": "Error creating the house" });
    });
});

router.get('/allHouses', async (req, res) => {
    let houses = await HouseSchema.find();
    res.json(houses)
});

router.get('/getHouseById/:id', async (req, res) => {
    let houses = await HouseSchema.findById(req.params.id);
    res.json(houses)
});

router.patch('/editHouse/:id', (req, res) => {
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
})

router.delete('/deleteHouse/:id', (req, res) => {
    var id = req.params.id;

    HouseSchema.findByIdAndDelete({ _id: id }).then(() => {
        res.json({ "status": "success", "message": "House deleted successfully" });
    }).catch((error) => {
        res.json({ "status": "failed", "message": "Error deleting house" });
    });
})

router.post('/addHousePhoto/houseId/:id', upload.single('file'), async (req, res) => {

    if(!req.file){
        return res.status(400).send({ "status": "failed", "message": "There is not a file on the request" })
    }
    
    var id = req.params.id;

    var housePhoto = {
        image: req.file.path
    }

    HouseSchema.findByIdAndUpdate(id, housePhoto, {new: true}).then((result) => {
        res.status(200).send({ "status": "success", "message": "House Photo uploaded successfully" })
    }).catch((err) => {
        res.status(200).send({ "status": "success", "message": "House Photo wanst uploaded" })
    });
});

module.exports = router;