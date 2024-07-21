const { checkSchema } = require('express-validator');
const MedicineModel = require('../models/medicine.model');


const medicinePostValidator = checkSchema({
    medicineCategoryID: {
        exists: {
            errorMessage: 'MedicineCategory ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicineCategory ID'
        }
    },
    medicineCode: {
        exists: {
            errorMessage: 'MedicineCode is required'
        },
        isString: {
            errorMessage: 'MedicineCode should be a string'
        },
        trim: true
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
    ingredients: {
        exists: {
            errorMessage: 'Ingredients is required'
        },
        isString: {
            errorMessage: 'Ingredients should be a string'
        },
        trim: true
    },
    unit: {
        exists: {
            errorMessage: 'Unit is required'
        },
        isString: {
            errorMessage: 'Unit should be a string'
        },
        trim: true
    },
    sideEffects: {
        exists: {
            errorMessage: 'SideEffects is required'
        },
        isString: {
            errorMessage: 'SideEffects should be a string'
        },
        trim: true
    },
    type: {
        exists: {
            errorMessage: 'Type is required'
        },
        isString: {
            errorMessage: 'Type should be a string'
        },
        trim: true
    },
    instruction: {
        exists: {
            errorMessage: 'Instruction is required'
        },
        isString: {
            errorMessage: 'Instruction should be a string'
        },
        trim: true
    },
    note: {
        exists: {
            errorMessage: 'Note is required'
        },
        isString: {
            errorMessage: 'Note should be a string'
        },
        trim: true
    }

});

const medicineUpdateValidator = checkSchema({
    medicineCategoryID: {
        exists: {
            errorMessage: 'MedicineCategory ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid medicineCategory ID'
        }
    },
    medicineCode: {
        exists: {
            errorMessage: 'MedicineCode is required'
        },
        isString: {
            errorMessage: 'MedicineCode should be a string'
        },
        trim: true
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
    ingredients: {
        exists: {
            errorMessage: 'Ingredients is required'
        },
        isString: {
            errorMessage: 'Ingredients should be a string'
        },
        trim: true
    },
    unit: {
        exists: {
            errorMessage: 'Unit is required'
        },
        isString: {
            errorMessage: 'Unit should be a string'
        },
        trim: true
    },
    sideEffects: {
        exists: {
            errorMessage: 'SideEffects is required'
        },
        isString: {
            errorMessage: 'SideEffects should be a string'
        },
        trim: true
    },
    type: {
        exists: {
            errorMessage: 'Type is required'
        },
        isString: {
            errorMessage: 'Type should be a string'
        },
        trim: true
    },
    instruction: {
        exists: {
            errorMessage: 'Instruction is required'
        },
        isString: {
            errorMessage: 'Instruction should be a string'
        },
        trim: true
    },
    note: {
        exists: {
            errorMessage: 'Note is required'
        },
        isString: {
            errorMessage: 'Note should be a string'
        },
        trim: true
    }
});

module.exports = {
    medicinePostValidator,
    medicineUpdateValidator
};