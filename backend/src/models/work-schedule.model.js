const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    detail: {
        day: String,
        hour: [{
            type: String,
            required: true
        }]
    },
});

module.exports = mongoose.model('WorkSchedule', workScheduleSchema);