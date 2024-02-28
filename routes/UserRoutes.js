const express = require('express');
const userRouter = express.Router();
const multer = require('multer')

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const FileUploadController = require('../controllers/FileUploadController');

const authController = new AuthController();
const userController = new UserController();
const fileUploadController = new FileUploadController();

storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/users')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

FileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    } else {
        cb(new Error('The file isnt a image'));
    }

}

upload = multer({ storage: storage, fileFilter: FileFilter})

userRouter.get('/allUsers', userController.getUsers);

userRouter.get('/findById/:id', userController.getUsersById);

userRouter.post('/addUser/', userController.addUser);

userRouter.patch('/editUser/:id', authController.validateToken, userController.editUser)

userRouter.delete('/deleteUser/:id', authController.validateToken, userController.deleteUser)

userRouter.post('/uploadUserPhoto/user/:id', upload.single('file'), fileUploadController.uploadUserPhoto)

module.exports = userRouter;
