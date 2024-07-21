const { checkSchema } = require("express-validator");

const adminValidator = checkSchema({
    userID: {
        exists: {
            errorMessage: 'UserID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid UserID'
        }
    },
    level: {
        exists: {
            errorMessage: 'Level is required'
        },
        isIn: {
            options: [['ADMIN', 'DOCTOR']],
            errorMessage: 'Level should be either ADMIN or DOCTOR'
        }
    }
});

module.exports = {
    adminValidator
};
