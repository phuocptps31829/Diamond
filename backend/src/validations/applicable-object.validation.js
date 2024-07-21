const { checkSchema } = require('express-validator');
const ApplicableObjectModel = require('../models/applicable-object.model');


const applicableObjectPostValidator = checkSchema({
    medicalPackageID: {
        exists: {
            errorMessage: 'MedicalPackage ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicalPackage ID'
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
            errorMessage: 'isMarried is required'
        },
        isBoolean: {
            errorMessage: 'isMarried should be a boolean'
        },
    },
    'coordinates.isFamily': {
        exists: {
            errorMessage: 'isFamily is required'
        },
        isBoolean: {
            errorMessage: 'isFamily should be a boolean'
        },
    },

});

const applicableObjectUpdateValidator = checkSchema({
    medicalPackageID: {
        exists: {
            errorMessage: 'MedicalPackage ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicalPackage ID'
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
            errorMessage: 'isMarried is required'
        },
        isBoolean: {
            errorMessage: 'isMarried should be a boolean'
        },
    },
    'coordinates.isFamily': {
        exists: {
            errorMessage: 'isFamily is required'
        },
        isBoolean: {
            errorMessage: 'isFamily should be a boolean'
        },
    },

});

module.exports = {
    applicableObjectPostValidator,
    applicableObjectUpdateValidator
};