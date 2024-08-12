const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
    phoneNumber: String,
    otp: String,
    time: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }
}, {
    collection: 'OTP',
    timestamps: true
}
);

module.exports = mongoose.model('OTP', otpSchema);