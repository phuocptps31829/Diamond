const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    clinicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    detail: [{
        hour: {
            type: String,
            trim: true,
            required: true
        },
        appointmentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
        },
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'WorkSchedule',
    timestamps: true
});

module.exports = mongoose.model('WorkSchedule', workScheduleSchema);