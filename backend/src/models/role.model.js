const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
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
}, {
    collection: 'Role',
    timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);