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
    image: {
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
    services: [
        {
            servicesID: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Services',
                required: true,
            }],
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
        },
    ],
    applicableObject: {
        type: Object,
        required: true
    },
    orderCount: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'MedicalPackage',
    timestamps: true
}
);

module.exports = mongoose.model('MedicalPackage', medicalPackageSchema);