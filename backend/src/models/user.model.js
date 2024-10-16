const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    roleID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Role',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    citizenIdentificationNumber: {
        type: Number,
    },
    otherInfo: {
        type: Object
    },
    isActivated: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'User',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);