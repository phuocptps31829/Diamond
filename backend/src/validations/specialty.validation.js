const { checkSchema } = require("express-validator");

const specialtyValidator = checkSchema({
    specialtyCode: {
        exists: {
            errorMessage: "Specialty code is required",
        },
        isString: {
            errorMessage: "Specialty code should be a string",
        },
    },
    image: {
        exists: {
            errorMessage: "Image is required",
        },
        isString: {
            errorMessage: "Image should be a string",
        },
    },
    name: {
        exists: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name should be a string",
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
    specialtyValidator,
};