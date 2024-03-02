const bcrypt = require('bcrypt');
const UserSchema = require('../models/User')

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

    async addUser(req, res) {
        const password = await bcrypt.hash(req.body.password, 10);
        let user = UserSchema({
            identification: req.body.identification,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password
        })
        console.log(user)
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

        const password = await bcrypt.hash(req.body.password, 10);

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
}

module.exports = UserController;