const { checkSchema } = require('express-validator');
const PrescriptionModel = require('../models/prescription.model');


const prescriptionPostValidator = checkSchema({
    advice: {
        exists: {
            errorMessage: 'Advice is required'
        },
        isString: {
            errorMessage: 'Advice should be a string'
        },
        trim: true
    },
    'medicines.*.medicineImportID': {
        exists: {
            errorMessage: 'medicineImport ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicineImport ID'
        }
    },
    'medicines.*.quantity': {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Quantity must be a positive integer'
        }
    },
    dosage: {
        exists: {
            errorMessage: 'Dosage is required'
        },
        isString: {
            errorMessage: 'Dosage should be a string'
        },
        trim: true
    },



});

const prescriptionUpdateValidator = checkSchema({
    advice: {
        exists: {
            errorMessage: 'Advice is required'
        },
        isString: {
            errorMessage: 'Advice should be a string'
        },
        trim: true
    },
    'medicines.*.medicineImportID': {
        exists: {
            errorMessage: 'medicineImport ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicineImport ID'
        }
    },
    'medicines.*.quantity': {
        exists: {
            errorMessage: 'Quantity is required'
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Quantity must be a positive integer'
        }
    },
    dosage: {
        exists: {
            errorMessage: 'Dosage is required'
        },
        isString: {
            errorMessage: 'Dosage should be a string'
        },
        trim: true
    },

});

module.exports = {
    prescriptionPostValidator,
    prescriptionUpdateValidator
};