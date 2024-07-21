const { checkSchema } = require('express-validator');
const MedicineImportModel = require('../models/medicine-import.model');


const medicineImportPostValidator = checkSchema({
    medicineID: {
        exists: {
            errorMessage: 'Medicine ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid Medicine ID'
        }
    },
    quantity: {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isNumeric: {
            errorMessage: 'Quantity should be a number'
        }
    },
    purchaseDate: {
        exists: {
            errorMessage: 'PurchaseDate is required'
        },
        isString: {
            errorMessage: 'PurchaseDate should be a string'
        },
        trim: true
    },
    manufacturingDate: {
        exists: {
            errorMessage: 'ManufacturingDate is required'
        },
        isDate: {
            errorMessage: 'Manufacturing date: Invalid date format'
        }
    },
    expiryDate: {
        exists: {
            errorMessage: 'ExpiryDate is required'
        },
        isDate: {
            errorMessage: 'Expiry date: Invalid date format'
        }
    },
    purchasePrice: {
        exists: {
            errorMessage: 'PurchasePrice is required'
        },
        isNumeric: {
            errorMessage: 'PurchasePrice should be a number'
        }
    },
    sellingPrice: {
        exists: {
            errorMessage: 'SellingPrice is required'
        },
        isNumeric: {
            errorMessage: 'SellingPrice should be a number'
        }
    },
    origin: {
        exists: {
            errorMessage: 'Origin is required'
        },
        isString: {
            errorMessage: 'Origin should be a string'
        },
        trim: true
    }

});

const medicineImportUpdateValidator = checkSchema({
    medicineID: {
        exists: {
            errorMessage: 'Medicine ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid Medicine ID'
        }
    },
    quantity: {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isNumeric: {
            errorMessage: 'Quantity should be a number'
        }
    },
    purchaseDate: {
        exists: {
            errorMessage: 'PurchaseDate is required'
        },
        isString: {
            errorMessage: 'PurchaseDate should be a string'
        },
        trim: true
    },
    manufacturingDate: {
        exists: {
            errorMessage: 'ManufacturingDate is required'
        },
        isDate: {
            errorMessage: 'Manufacturing date: Invalid date format'
        }
    },
    expiryDate: {
        exists: {
            errorMessage: 'ExpiryDate is required'
        },
        isDate: {
            errorMessage: 'Expiry date: Invalid date format'
        }
    },
    purchasePrice: {
        exists: {
            errorMessage: 'PurchasePrice is required'
        },
        isNumeric: {
            errorMessage: 'PurchasePrice should be a number'
        }
    },
    sellingPrice: {
        exists: {
            errorMessage: 'SellingPrice is required'
        },
        isNumeric: {
            errorMessage: 'SellingPrice should be a number'
        }
    },
    origin: {
        exists: {
            errorMessage: 'Origin is required'
        },
        isString: {
            errorMessage: 'Origin should be a string'
        },
        trim: true
    }
});

module.exports = {
    medicineImportPostValidator,
    medicineImportUpdateValidator
};