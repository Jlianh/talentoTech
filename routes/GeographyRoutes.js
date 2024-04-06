const express = require('express');
const geographyRouter = express.Router();

const GeographyController = require('../controllers/GeographyController');

const geographyController = new GeographyController();

geographyRouter.get('/getDepartaments', geographyController.getDepartments);

geographyRouter.get('/getCitiesByDepartment/:id', geographyController.getCityByDepartment);

module.exports = geographyRouter;
