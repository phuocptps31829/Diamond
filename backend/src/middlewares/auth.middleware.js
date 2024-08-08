const jwt = require('jsonwebtoken');
const OtpModel = require('../models/otp.model');
const { createError, compareHashedValue } = require('../utils/helper.util');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        createError(401, 'Không có quyền truy cập.');
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = { id: verifiedUser.id, isAdmin: verifiedUser.isAdmin };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            createError(401, 'Token hết hạn.');
        }

        createError(403, 'Token không hợp lệ.');
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

    if (!otpToken || !OTP) {
        createError(403, 'Thiếu token hoặc OTP.');
    }

    try {
        const verifiedToken = jwt.verify(otpToken, 'secret-key');

        const { phoneNumber, fullName, password } = verifiedToken;

        const otpHolder = await OtpModel.find({ phoneNumber });

        if (!otpHolder.length) {
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
        if (error.name === 'TokenExpiredError') {
            createError(401, 'Token hết hạn.');
        }

        // createError(403, 'Token không hợp lệ.');
        console.log(error);
    }
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyOTP
};