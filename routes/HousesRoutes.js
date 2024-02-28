const express = require('express');
const houseRouter = express.Router();
const multer = require('multer')

const HouseController = require('../controllers/HouseController')
const FileUploadController = require('../controllers/FileUploadController');

const houseController = new HouseController();
const fileUploadController = new FileUploadController();

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

houseRouter.post('/addHouse/', houseController.addHouse);

houseRouter.get('/allHouses', houseController.getHouses);

houseRouter.get('/getHouseById/:id', houseController.getHousesById);

houseRouter.patch('/editHouse/:id', houseController.editHouse)

houseRouter.delete('/deleteHouse/:id', houseController.deleteHouse)

houseRouter.post('/addHousePhoto/houseId/:id', upload.single('file'), fileUploadController.uploadHousePhoto);

module.exports = houseRouter;