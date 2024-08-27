const { checkSchema } = require("express-validator");
const { checkIsExistID } = require('../utils/database.util');

const PatientModel = require('../models/patient.model');
const PrescriptionModel = require('../models/prescription.model');

const invoiceValidator = checkSchema({
    patientID: {
        customSanitizer: {
            options: (id) => checkIsExistID(PatientModel, id),
        }
    },
    prescriptionID: {
        customSanitizer: {
            options: (id) => checkIsExistID(PrescriptionModel, id),
        }
    },
    appointmentID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Appointment ID",
        },
    },
    serviceID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Service ID",
        },
    },
    price: {
        exists: {
            errorMessage: "Price is required",
        },
        isNumeric: {
            errorMessage: "Price should be a number",
        },
    },
});

module.exports = {
    invoiceValidator,
};