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
    isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Specialty', specialtySchema);