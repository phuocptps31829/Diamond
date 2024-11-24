const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
    branchID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    specialtyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
}, {
    collection: 'Clinic',
    timestamps: true
}
);

module.exports = mongoose.model('Clinic', clinicSchema);