const { checkSchema } = require("express-validator");

const invoiceValidator = checkSchema({
    prescriptionID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid prescriptionID",
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