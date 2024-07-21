const { checkSchema } = require('express-validator');
const ServiceModel = require('../models/service.model');


const servicePostValidator = checkSchema({
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
            errorMessage: 'ShortDescription is required'
        },
        isString: {
            errorMessage: 'ShortDescription should be a string'
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
            errorMessage: 'DiscountPrice should be a number'
        }
    },
    duration: {
        exists: {
            errorMessage: 'Duration is required'
        },
        isString: {
            errorMessage: 'Duration should be a string'
        },
        trim: true
    },

});

const serviceUpdateValidator = checkSchema({
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
            errorMessage: 'ShortDescription is required'
        },
        isString: {
            errorMessage: 'ShortDescription should be a string'
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
            errorMessage: 'DiscountPrice should be a number'
        }
    },
    duration: {
        exists: {
            errorMessage: 'Duration is required'
        },
        isString: {
            errorMessage: 'Duration should be a string'
        },
        trim: true
    },

});

module.exports = {
    servicePostValidator,
    serviceUpdateValidator
};