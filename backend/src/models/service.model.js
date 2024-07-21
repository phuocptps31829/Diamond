const { default: mongoose } = require("mongoose");

const serviceSchema = new mongoose.Schema({
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
    price: {
        type: Number,
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
    discountPrice: {
        type: Number,
        required: false
    },
    duration: {
        type: String,
        trim: true,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('Service', serviceSchema);