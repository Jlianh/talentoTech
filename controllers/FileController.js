const UserSchema = require('../models/User')
const HouseSchema = require('../models/Houses')

const fs = require('fs')

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

    readDepartamentList(req, res){
        fs.readFile('assets/departaments.json', 'utf8', (err, data)=>{
            if(err){
                res.status(500).send({"status": "Failed", "content": "The file wasnt read successfully"})
                return
            }
            res.status(200).send({"status": "Success", "content": JSON.parse(data)})
        })
    }
    
}

module.exports = FileUploadController;