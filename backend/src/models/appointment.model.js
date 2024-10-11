const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Service',
    },
    medicalPackageID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'MedicalPackage',
    },
    workScheduleID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'WorkSchedule',
        required: true
    },
    patientHelpID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    payment: {
        method: {
            type: String,
        },
        refundCode: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Appointment',
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);