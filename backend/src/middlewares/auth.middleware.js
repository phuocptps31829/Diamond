const jwt = require('jsonwebtoken');
const OtpModel = require('../models/otp.model');
const { createError, compareHashedValue } = require('../utils/helper.util');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        if (!token) {
            createError(401, 'Không có quyền truy cập.');
        }

        const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: verifiedUser.id };

        next();
    } catch (error) {
        next(error);
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            createError(403, 'Không phải admin.');
        }
    });
};

const verifyOTP = async (req, res, next) => {
    const { otpToken, OTP } = req.body;
    try {
        if (!otpToken || !OTP) {
            createError(403, 'Thiếu token hoặc OTP.');
        }

        const verifiedToken = jwt.verify(otpToken, 'secret-key');

        const { phoneNumber, fullName, password } = verifiedToken;
        const otpHolder = await OtpModel.find({ phoneNumber });

        if (!otpHolder.length) {
            console.log(1);
            createError(401, 'Token hết hạn.');
        }

        const lastOTP = otpHolder[otpHolder.length - 1];

        const validOTP = await compareHashedValue(OTP, lastOTP.otp);

        if (!validOTP) {
            createError(403, 'OTP không đúng.');
        }

        req.newUser = { phoneNumber, password, fullName };
        console.log('new', phoneNumber, password, fullName);
        next();
    } catch (error) {
        next(error);
        console.log(error);
        console.log('err name', error.name);
    }
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyOTP
};