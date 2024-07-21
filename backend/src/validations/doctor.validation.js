const { checkSchema } = require("express-validator");

const doctorValidator = checkSchema({
    userID: {
        exists: {
            errorMessage: "User ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid User ID",
        },
    },
    specialtyID: {
        exists: {
            errorMessage: "Specialty ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Specialty ID",
        },
    },
    title: {
        exists: {
            errorMessage: "Title is required",
        },
        isString: {
            errorMessage: "Title should be a string",
        },
    },
    practicingCertificate: {
        exists: {
            errorMessage: "Practicing certificate is required",
        },
        isString: {
            errorMessage: "Practicing certificate should be a string",
        },
    },
    yearsExperience: {
        exists: {
            errorMessage: "Years of experience is required",
        },
        isNumeric: {
            errorMessage: "Years of experience should be a number",
        },
    },
    detail: {
        exists: {
            errorMessage: "Detail is required",
        },
        isString: {
            errorMessage: "Detail should be a string",
        },
    },
    isInternal: {
        exists: {
            errorMessage: "Internal status is required",
        },
        isBoolean: {
            errorMessage: "Internal status should be a boolean",
        },
    },
});

module.exports = {
    doctorValidator,
};