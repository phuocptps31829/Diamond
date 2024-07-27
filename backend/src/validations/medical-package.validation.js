const { checkSchema } = require('express-validator');
const { isValidObjectId } = require("mongoose");

const medicalPackageValidator = checkSchema({
    specialtyID: {
        exists: {
            errorMessage: 'Specialty ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid specialty ID'
        }
    },
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    shortDescription: {
        exists: {
            errorMessage: 'Short description is required'
        },
        isString: {
            errorMessage: 'Short description should be a string'
        },
        trim: true
    },
    details: {
        exists: {
            errorMessage: 'Details is required'
        },
        isString: {
            errorMessage: 'Details should be a string'
        },
        trim: true
    },
    'services.*.servicesID': {
        custom: {
            options: (serviceIDArray) => {
                if (!serviceIDArray.length) return false;
                return serviceIDArray.every(id => isValidObjectId(id));
            },
            errorMessage: 'Each Service ID must be a valid MongoDB ObjectID'
        }
    },
    'services.*.levelName': {
        exists: {
            errorMessage: 'Level name is required'
        },
        isString: {
            errorMessage: 'Level name should be a string'
        },
        trim: true
    },
    'services.*.price': {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price must be a number'
        }
    },
    'services.*.discountPrice': {
        optional: true,
        isNumeric: {
            errorMessage: 'Discount price must be a number'
        }
    },
    'services.*.duration': {
        exists: {
            errorMessage: 'Duration ID is required'
        },
        isString: {
            errorMessage: 'Duration should be a string'
        }
    }
});


module.exports = {
    medicalPackageValidator
};