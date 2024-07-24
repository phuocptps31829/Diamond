const { checkSchema } = require('express-validator');

const medicalPackageValidator = checkSchema({
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
    'service.*.serviceID': {
        exists: {
            errorMessage: 'Service ID is required'
        },
        isArray: {
            errorMessage: 'service ID: must be an array'
        }
    },
    'service.*.levelName': {
        exists: {
            errorMessage: 'Level name is required'
        },
        isString: {
            errorMessage: 'Level name should be a string'
        },
        trim: true
    },
    'service.*.price': {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price must be a number'
        }
    },
    'service.*.discountPrice': {
        optional: true,
        isNumeric: {
            errorMessage: 'Discount price must be a number'
        }
    },
    'service.*.duration': {
        exists: {
            errorMessage: 'Service ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid service ID'
        }
    }
});


module.exports = {
    medicalPackageValidator
};