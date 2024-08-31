const { checkSchema } = require("express-validator");
const { checkIsExistID } = require('../utils/database.util');

const DoctorModel = require('../models/doctor.model');
const AppointmentModel = require('../models/appointment.model');

const workScheduleValidator = checkSchema({
    doctorID: {
        customSanitizer: {
            options: (id) => checkIsExistID(DoctorModel, id),
        }
    },
    day: {
        optional: true,
        isISO8601: {
            errorMessage: "Invalid day time format",
        },
    },
    clinicID: {
        exists: {
            errorMessage: 'Clinic ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid clinic ID'
        }
    },
    'detail.hour': {
        optional: true,
        matches: {
            options: [/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/],
            errorMessage: "Invalid time format. The correct format is HH:mm-HH:mm."
        }
    },
    'detail.appointmentID': {
        customSanitizer: {
            options: (id) => {
                if (id && id.trim() !== '') {
                    return checkIsExistID(AppointmentModel, id);
                }
                return id;
            },
        },
        optional: { options: { nullable: true, checkFalsy: true } },
    },
});

module.exports = {
    workScheduleValidator
};