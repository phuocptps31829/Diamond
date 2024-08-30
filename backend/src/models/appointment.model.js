const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',
        required: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Service',
    },
    medicalPackageID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'MedicalPackage',
    },
    clinicID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinic',
        required: true
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
    isHelp: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Appointment',
    },
    paymentMethod: {
        method: {
            type: String,
        },
        signature: {
            type: String,
        },
        isPaid: {
            type: Boolean,
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