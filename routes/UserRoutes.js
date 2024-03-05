const express = require('express');
const userRouter = express.Router();
const multer = require('multer')

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const FileController = require('../controllers/FileController');

const authController = new AuthController();
const userController = new UserController();
const fileController = new FileController();

storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/users')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

FileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/')){
        cb(null, true)
    } else {
        cb(new Error('The file hasnt any valid format'));
    }

}

upload = multer({ storage: storage, fileFilter: FileFilter})

userRouter.get('/allUsers', userController.getUsers);

userRouter.get('/findById/:id', userController.getUsersById);

userRouter.post('/addUser/', userController.addSingleUser);

userRouter.patch('/editUser/:id', authController.validateToken, userController.editUser)

userRouter.delete('/deleteUser/:id', authController.validateToken, userController.deleteUser)

userRouter.post('/uploadUserPhoto/user/:id', upload.single('file'), fileController.uploadUserPhoto)

userRouter.post('/uploadUsers', upload.single('file'), userController.uploadUsers);

module.exports = userRouter;
