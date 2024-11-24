const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    hotline: {
        type: String,
        required: true
    },
}, {
    collection: 'Hospital',
    timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);