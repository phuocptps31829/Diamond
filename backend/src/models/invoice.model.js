const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    prescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
    },
    price: {
        type: Number,
        required: true
    },
    arisePrice: {
        type: Number,
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