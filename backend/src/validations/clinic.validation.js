const { checkSchema } = require('express-validator');
const clinicModel = require('../models/clinic.model');


const clinicPostValidator = checkSchema({

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

const clinicUpdateValidator = checkSchema({
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
    clinicPostValidator,
    clinicUpdateValidator
};