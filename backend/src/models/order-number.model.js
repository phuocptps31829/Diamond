const mongoose = require("mongoose");

const orderNumber = new mongoose.Schema({
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'OrderNumber',
    timestamps: true
});

module.exports = mongoose.model('OrderNumber', orderNumber);