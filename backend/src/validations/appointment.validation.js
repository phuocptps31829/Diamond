const { checkSchema } = require('express-validator');
const { checkIsExistID } = require('../utils/database.util');

const PatientModel = require('../models/patient.model');
const ServiceModel = require('../models/service.model');
const MedicalPackageModel = require('../models/medical-package.model');
const WorkScheduleModel = require('../models/work-schedule.model');

const appointmentValidator = checkSchema({
    patientID: {
        customSanitizer: {
            options: (id) => checkIsExistID(PatientModel, id, true),
        }
    },
    workScheduleID: {
        customSanitizer: {
            options: (id) => checkIsExistID(WorkScheduleModel, id, true),
        }
    },
    serviceID: {
        customSanitizer: {
            options: (id) => checkIsExistID(ServiceModel, id),
        }
    },
    medicalPackageID: {
        customSanitizer: {
            options: (id) => checkIsExistID(MedicalPackageModel, id),
        }
    },
    patientHelpID: {
        customSanitizer: {
            options: (id) => checkIsExistID(PatientModel, id),
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
