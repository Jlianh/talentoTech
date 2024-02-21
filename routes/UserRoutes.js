const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer')

const UserController = require('../controllers/UserController')
const userController = new UserController();

const UserSchema = require('../models/User');


router.get('/allUsers', userController.validateToken, async (req, res) => {
    let users = await UserSchema.find();
    res.json(users)
});

router.get('/findByEmail/:email', async (req, res) => {
    let users = await UserSchema.where({ email: req.params.email });
    res.json(users)
});

router.get('/findById/:id', async (req, res) => {
    let users = await UserSchema.findById(req.params.id);
    res.json(users)
});

router.post('/addUser/', async (req, res) => {
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
            res.json({ "status": "failed", "message": "Error creating the user" });
        }
    });
});

router.patch('/editUser/:id', (req, res) => {
    var id = req.params.id;

    var updatedUser = {
        identification: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    UserSchema.findByIdAndUpdate(id, updatedUser, { new: true }).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send("Error al actualizar el Usuario");
    });
})

router.delete('/deleteUser/:id', (req, res) => {
    var id = req.params.id;

    UserSchema.findByIdAndDelete({ _id: id }).then(() => {
        res.json({ "status": "success", "message": "User deleted successfully" });
    }).catch((error) => {
        res.json({ "status": "failed", "message": "Error deleting user" });
    });
})

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    userController.login(email, password).then((result)=>{
        res.send(result)
    })
})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
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

router.post('/uploadPhoto/:id/user', upload.single('file'), (req, res)=>{
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

})

module.exports = router;
