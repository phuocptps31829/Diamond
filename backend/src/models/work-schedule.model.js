const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    clinicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hour: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'WorkSchedule',
    timestamps: true
});

module.exports = mongoose.model('WorkSchedule', workScheduleSchema);