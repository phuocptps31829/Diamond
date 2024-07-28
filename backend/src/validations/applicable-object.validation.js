const { checkSchema } = require('express-validator');
const ApplicableObjectModel = require('../models/applicable-object.model');


const applicableObjectValidator = checkSchema({
    medicalPackageID: {
        exists: {
            errorMessage: 'Medical package ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medical package ID'
        }
    },
    gender: {
        exists: {
            errorMessage: 'Gender is required'
        },
        isString: {
            errorMessage: 'Gender should be a string'
        },
        trim: true
    },

    'coordinates.min': {
        exists: {
            errorMessage: 'Min is required'
        },
        isNumeric: {
            errorMessage: 'Min should be a number'
        }
    },
    'coordinates.max': {
        exists: {
            errorMessage: 'Max is required'
        },
        isNumeric: {
            errorMessage: 'Max should be a number'
        },
    },
    'coordinates.isMarried': {
        exists: {
            errorMessage: 'is married is required'
        },
        isBoolean: {
            errorMessage: 'is married should be a boolean'
        },
    },
    'coordinates.isFamily': {
        exists: {
            errorMessage: 'is family is required'
        },
        isBoolean: {
            errorMessage: 'is family should be a boolean'
        },
    },

});


module.exports = {
    applicableObjectValidator
};