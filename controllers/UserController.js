const UserSchema = require('../models/User');
const Utils = require('../utils/Utils');

const xlsx = require('xlsx')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)
const utils = new Utils();

class UserController {

    constructor() { }

    async getUsers(req, res, next) {
        let users = await UserSchema.find();
        res.json(users)
    }

    async getUsersById(req, res) {
        let users = await UserSchema.findById(req.params.id);
        res.json(users)
    }

    async addSingleUser(req, res) {
        const password = await bcrypt.hash(req.body.password, 10);
        let user = UserSchema({
            identification: req.body.identification,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password
        })
        user.save().then((result) => {
            res.send(result)
        }).catch((err) => {
            if (err.code == 11000) {
                res.json({ "status": "failed", "message": "Email already exists" });
            } else {
                console.log(err);
                res.json({ "status": "failed", "message": "Error creating the user" });
            }
        });
    }

    async editUser(req, res) {
        var id = req.params.id;

        const password = utils.encryptPassword(req.params.password, false)

        var updatedUser = {
            identification: req.body.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password
        };

        UserSchema.findByIdAndUpdate(id, updatedUser, { new: true }).then((result) => {
            res.send(result)
        }).catch((error) => {
            res.send("Error al actualizar el Usuario");
        });
    }

    async deleteUser(req, res){
        var id = req.params.id;

        UserSchema.findByIdAndDelete({ _id: id }).then(() => {
            res.json({ "status": "success", "message": "User deleted successfully" });
        }).catch((error) => {
            res.json({ "status": "failed", "message": "Error deleting user" });
        });
    }

    async uploadUsers(req, res){
        if(!req.file){
            return res.status(400).send({ "status": "failed", "message": "There is not a file on the request" })
        }
        console.log(req.file.path);
        const workbook = xlsx.readFile(req.file.path)
        const sheet_list = workbook.SheetNames
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]])
        
        for(let users of data){
            users.email = users.email.trim().toLowerCase()
            users.password = await utils.encryptPassword(users.password, true);
            UserSchema({
                name: users.name,
                lastname: users.lastname,
                email: users.email,
                identification: users.id,
                password: users.password,
            }).save().then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        }

        await unlinkAsync(req.file.path);
    }

}

module.exports = UserController;