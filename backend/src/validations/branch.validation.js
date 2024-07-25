const { checkSchema } = require('express-validator');

const branchPostValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    workingTime: {
        exists: {
            errorMessage: 'WorkingTime is required'
        },
        isString: {
            errorMessage: 'WorkingTime should be a string'
        },
        trim: true
    },
    imagesURL: {
        isArray: {
            errorMessage: 'ImagesURL is not Array'
        }
    },
    address: {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address should be a string'
        },
        trim: true
    },
    hotline: {
        exists: {
            errorMessage: 'Hotline is required'
        },
        isString: {
            errorMessage: 'Hotline should be a string'
        },
        trim: true
    },
    'coordinates.ing': {
        exists: {
            errorMessage: 'Ing is required'
        },
        isNumeric: {
            errorMessage: 'Ing should be a number'
        }
    },
    'coordinates.lat': {
        exists: {
            errorMessage: 'Lat is required'
        },
        isNumeric: {
            errorMessage: 'Lat should be a number'
        }
    }

});

const branchUpdateValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
    workingTime: {
        exists: {
            errorMessage: 'WorkingTime is required'
        },
        isString: {
            errorMessage: 'WorkingTime should be a string'
        },
        trim: true
    },
    imagesURL: {
        isArray: {
            errorMessage: 'ImagesURL is not Array'
        }
    },
    address: {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address should be a string'
        },
        trim: true
    },
    hotline: {
        exists: {
            errorMessage: 'Hotline is required'
        },
        isString: {
            errorMessage: 'Hotline should be a string'
        },
        trim: true
    },
    'coordinates.ing': {
        exists: {
            errorMessage: 'Ing is required'
        },
        isNumeric: {
            errorMessage: 'Ing should be a number'
        }
    },
    'coordinates.lat': {
        exists: {
            errorMessage: 'Lat is required'
        },
        isNumeric: {
            errorMessage: 'Lat should be a number'
        }
    }
});

module.exports = {
    branchPostValidator,
    branchUpdateValidator
};