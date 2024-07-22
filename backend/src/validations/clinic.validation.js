const { checkSchema } = require('express-validator');
const clinicModel = require('../models/clinic.model');


const clinicValidator = checkSchema({

    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },


});

module.exports = {
    clinicValidator

};