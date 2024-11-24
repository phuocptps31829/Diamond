const mongoose = require("mongoose");

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
        lng: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
}, {
    collection: 'Branch',
    timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);