const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',
    },
    hospitalID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital',
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Invoice',
    timestamps: true
});

module.exports = mongoose.model('Contract', contractSchema);