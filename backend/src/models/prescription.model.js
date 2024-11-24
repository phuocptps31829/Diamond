const { default: mongoose } = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    advice: {
        type: String,
        trim: true,
        required: true
    },
    resultID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
        required: true,
    },
    medicines: [{
        medicineID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        dosage: {
            type: String,
            trim: true,
            required: true
        }
    }],
}, {
    collection: 'Prescription',
    timestamps: true
}
);

module.exports = mongoose.model('Prescription', prescriptionSchema);