const { default: mongoose } = require("mongoose");

const medicalPackageSchema = new mongoose.Schema({
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
    shortDescription: {
        type: String,
        trim: true,
        required: true
    },
    details: {
        type: String,
        trim: true,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    services: [
        {
            servicesID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Services',
                required: true,
            },
            levelName: {
                type: String,
                trim: true,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            discountPrice: {
                type: Number,
                required: false
            },
            duration: {
                type: String,
                trim: true,
                required: true
            },
            isDeleted: {
                type: Boolean,
                default: false
            }

        },
    ],
}
);

module.exports = mongoose.model('MedicalPackage', medicalPackageSchema);