const { checkSchema } = require("express-validator");

const workScheduleValidator = checkSchema({
    doctorID: {
        exists: {
            errorMessage: "Doctor ID is required",
        },
        isString: {
            errorMessage: "Doctor ID should be a string",
        },
    },
    detail: {
        exists: {
            errorMessage: "Detail is required",
        },
        isObject: {
            errorMessage: "Detail should be an object",
        },
        customSanitizer: {
            options: (value) => {
                if (!value.day || !value.hour) {
                    throw new Error("Detail should have day and hour");
                }
                return true;
            },
        },
    },
});

module.exports = {
    workScheduleValidator
};