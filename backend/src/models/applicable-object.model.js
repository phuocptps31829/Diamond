const { default: mongoose } = require("mongoose");

const applicableObjectSchema = new mongoose.Schema({
    medicalPackageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalPackage',
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        Min: {
            type: Number,
            required: false,
        },
        Max: {
            type: Number,
            required: false,
        },
    },
    isMarried: {
        type: Boolean,
        default: false
    },
    isFamily: {
        type: Boolean,
        default: false
    }, isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'ApplicableObject',
    timestamps: true
}
);

module.exports = mongoose.model('ApplicableObject', applicableObjectSchema);