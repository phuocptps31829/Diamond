const { checkSchema } = require('express-validator');
const MedicineImportModel = require('../models/medicine-import.model');


const medicineImportPostValidator = checkSchema({

    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },


});

const medicineImportUpdateValidator = checkSchema({
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name should be a string'
        },
        trim: true
    },
});

module.exports = {
    medicineImportPostValidator,
    medicineImportUpdateValidator
};