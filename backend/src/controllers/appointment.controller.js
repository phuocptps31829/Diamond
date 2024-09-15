const AppointmentModel = require('../models/appointment.model');
const { createError, errorValidator } = require("../utils/helper.util");

const createAppointment = (req, res, next) => {
    try {
        errorValidator(req, res);
    } catch (error) {
        next(error);
    }
};


module.exports = {

};