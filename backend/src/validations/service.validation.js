const { checkSchema } = require('express-validator');

const serviceValidator = checkSchema({
    specialtyID: {
        exists: {
            errorMessage: 'Specialty ID is required'
        },
        isMongoId: {
            errorMessage: 'Specialty ID is invalid'
        },
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
    price: {
        exists: {
            errorMessage: 'Price is required'
        },
        isNumeric: {
            errorMessage: 'Price should be a number'
        }
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
    discountPrice: {
        optional: true,
        isNumeric: {
            errorMessage: 'Discount Price should be a number'
        }
    },
    duration: {
        exists: {
            errorMessage: 'Duration is required'
        },
        isNumeric: {
            errorMessage: 'Duration should be a number'
        }
    },

});

module.exports = {
    serviceValidator,
};