const express = require('express');
const fileRouter = express.Router();

const FileController = require('../controllers/FileController');

const fileController = new FileController();

fileRouter.get('/getDepartaments', fileController.readDepartamentList);

module.exports = fileRouter;
