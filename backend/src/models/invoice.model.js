const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Appointment',
    },
    prescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
    },
    invoiceCode: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    arisePrice: {
        type: Number,
    },
    file: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Invoice',
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);