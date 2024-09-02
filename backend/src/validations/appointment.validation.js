const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const PatientModel = require('../models/patient.model');
const WorkScheduleModel = require('../models/work-schedule.model');

const appointmentValidator = checkSchema({
    patientID: {
        customSanitizer: {
            options: (id) => checkIsExistID(PatientModel, id),
        }
    },
    workScheduleID: {
        customSanitizer: {
            options: (id) => checkIsExistID(WorkScheduleModel, id),
        }
    },
    serviceID: {
        optional: true,
        isMongoId: {
            errorMessage: 'Invalid Service ID'
        }
    },
    medicalPackageID: {
        optional: true,
        isMongoId: {
            errorMessage: 'Invalid Medical Package ID'
        }
    },
    type: {
        exists: {
            errorMessage: 'Appointment type is required'
        },
        isString: {
            errorMessage: 'Appointment type should be a string'
        },
    },
    time: {
        exists: {
            errorMessage: 'Appointment time is required'
        },
        isISO8601: {
            errorMessage: 'Invalid appointment time format'
        }
    },
    price: {
        exists: {
            errorMessage: 'Price time is required'
        },
        isNumeric: {
            errorMessage: 'Price type should be a number'
        }
    },
    status: {
        exists: {
            errorMessage: 'Status is required'
        },
        isString: {
            errorMessage: 'Status should be a string'
        },
        isIn: {
            options: [['Đã xác nhận', 'Đã hủy', 'Chờ xác nhận', 'Đã khám']],
            errorMessage: 'Status is not valid'
        }
    },
});

module.exports = {
    appointmentValidator
};
