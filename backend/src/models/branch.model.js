const { default: mongoose } = require("mongoose");

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    workingTime: {
        type: String,
        required: true
    },
    imagesURL: [{
        type: String,
        trim: true,
        required: true
    }],
    address: {
        type: String,
        trim: true,
        required: true
    },
    hotline: {
        type: String,
        trim: true,
        required: true
    },
    coordinates: {
        ing: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('Branch', branchSchema);