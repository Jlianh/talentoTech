const UserSchema = require('../models/User')
const HouseSchema = require('../models/Houses')

class FileUploadController {

    constructor() { }

    uploadUserPhoto(req, res){
        if(!req.file){
            return res.status(400).send({ "status": "failed", "message": "There is not a file on the request" })
        }
    
        var id = req.params.id;
    
        var updatedUser = {
            avatar: req.file.path
        }
    
        UserSchema.findByIdAndUpdate(id, updatedUser, {new: true}).then((result)=>{
            res.status(200).send({ "status": "success", "message": "File upload successfully" })
        }).catch((error)=>{
            res.status(200).send({ "status": "failed", "message": "The file wasnt uploaded" })
        })
    }

    uploadHousePhoto(req, res){
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
    }

}

module.exports = FileUploadController;