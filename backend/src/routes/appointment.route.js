const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const appointmentController = require('../controllers/appointment.controller');
const appointmentValidator = require('../validations/appointment.validation');

module.exports = router;