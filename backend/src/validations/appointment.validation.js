const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const patientModel = require('../models/patient.model');
const doctorModel = require('../models/doctor.model');
const clinicModel = require('../models/clinic.model');

const appointmentValidator = checkSchema({
    patientID: {
        customSanitizer: {
            options: (id) => checkIsExistID(patientModel, id),
        }
    },
    doctorID: {
        customSanitizer: {
            options: (id) => checkIsExistID(doctorModel, id),
        }
    },
    clinicID: {
        customSanitizer: {
            options: (id) => checkIsExistID(clinicModel, id),
        },
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
    status: {
        exists: {
            errorMessage: 'Status is required'
        },
        isString: {
            errorMessage: 'Status should be a string'
        },
        isIn: {
            options: [['Đã xác nhận', 'Đã hủy', 'Đang chờ', 'Đã khám']],
            errorMessage: 'Status is not valid'
        }
    },
    isHelp: {
        exists: {
            errorMessage: 'Appointment or Service?'
        },
        isBoolean: {
            errorMessage: 'Appointment or Service should be a boolean'
        }
    },
});

module.exports = {
    appointmentValidator
};
