const { checkSchema } = require('express-validator');
const ApplicableObjectModel = require('../models/applicable-object.model');


const applicableObjectPostValidator = checkSchema({
    gender: {
        exists: {
            errorMessage: 'Gender is required'
        },
        isString: {
            errorMessage: 'Gender should be a string'
        },
        trim: true
    },

    'coordinates.Min': {
        exists: {
            errorMessage: 'Min is required'
        },
        isNumeric: {
            errorMessage: 'Min should be a number'
        }
    },
    'coordinates.Max': {
        exists: {
            errorMessage: 'Max is required'
        },
        isNumeric: {
            errorMessage: 'Max should be a number'
        }
    },


});

const applicableObjectUpdateValidator = checkSchema({
    gender: {
        exists: {
            errorMessage: 'Gender is required'
        },
        isString: {
            errorMessage: 'Gender should be a string'
        },
        trim: true
    },

    'coordinates.Ing': {
        exists: {
            errorMessage: 'Ing is required'
        },
        isNumeric: {
            errorMessage: 'Ing should be a number'
        }
    },
    'coordinates.Lat': {
        exists: {
            errorMessage: 'Lat is required'
        },
        isNumeric: {
            errorMessage: 'Lat should be a number'
        }
    }
});

module.exports = {
    applicableObjectPostValidator,
    applicableObjectUpdateValidator
};