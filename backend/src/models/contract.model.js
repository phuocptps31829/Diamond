const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    hospitalID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Branch',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    file: {
        type: String,
        required: true
    },
}, {
    collection: 'Contract',
    timestamps: true
});

module.exports = mongoose.model('Contract', contractSchema);