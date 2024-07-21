const { checkSchema } = require('express-validator');
const MedicalPackageModel = require('../models/medical-package.model');


const medicalPackagePostValidator = checkSchema({
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
    'service.*.serviceID': {
        exists: {
            errorMessage: 'Service ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid service ID'
        }
    },
    'service.*.levelName': {
        exists: {
            errorMessage: 'LevelName is required'
        },
        isString: {
            errorMessage: 'LevelName should be a string'
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
            errorMessage: 'DiscountPrice must be a number'
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

const medicalPackageUpdateValidator = checkSchema({
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
    'service.*.serviceID': {
        exists: {
            errorMessage: 'Service ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid service ID'
        }
    },
    'service.*.levelName': {
        exists: {
            errorMessage: 'LevelName is required'
        },
        isString: {
            errorMessage: 'LevelName should be a string'
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
            errorMessage: 'DiscountPrice must be a number'
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
    medicalPackagePostValidator,
    medicalPackageUpdateValidator
};