const { checkSchema } = require("express-validator");

const invoiceValidator = checkSchema({
    patientID: {
        exists: {
            errorMessage: "Patient ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Patient ID",
        },
    },
    prescriptionID: {
        exists: {
            errorMessage: "Prescription ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Prescription ID",
        },
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
    totalPrice: {
        exists: {
            errorMessage: "Total price is required",
        },
        isNumeric: {
            errorMessage: "Total price should be a number",
        },
    },
});

module.exports = {
    invoiceValidator,
};