const { checkSchema } = require("express-validator");

const resultValidator = checkSchema({
    appointmentID: {
        exists: {
            errorMessage: "Appointment ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Appointment ID",
        },
    },
    serviceID: {
        exists: {
            errorMessage: "Service ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Service ID",
        },
    },
    diagnose: {
        exists: {
            errorMessage: "Diagnose is required",
        },
        isString: {
            errorMessage: "Diagnose should be a string",
        },
    },
    images: {
        optional: true,
        isArray: {
            errorMessage: "Images should be an array",
        },
    },
    description: {
        exists: {
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Description should be a string",
        },
    },
});

module.exports = {
    resultValidator,
};