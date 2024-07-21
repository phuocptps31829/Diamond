const { checkSchema } = require("express-validator");

const contractValidator = checkSchema({
    doctorID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Doctor ID",
        },
    },
    hospitalID: {
        optional: true,
        isMongoId: {
            errorMessage: "Invalid Hospital ID",
        },
    },
    startDate: {
        exists: {
            errorMessage: "Start date is required",
        },
        isString: {
            errorMessage: "Start date should be a string",
        },
    },
    endDate: {
        exists: {
            errorMessage: "End date is required",
        },
        isString: {
            errorMessage: "End date should be a string",
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
});

module.exports = {
    contractValidator,
};
