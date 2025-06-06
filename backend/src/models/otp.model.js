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

otpSchema.methods.isExpired = function () {
    const time = 60 * 1000;
    const currentTime = Date.now();
    return (currentTime - this.time.getTime()) < time;
};

module.exports = mongoose.model('OTP', otpSchema);