const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema({
    specialtyCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Invoice',
    timestamps: true
});

module.exports = mongoose.model('Specialty', specialtySchema);