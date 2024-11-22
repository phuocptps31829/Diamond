const jwt = require('jsonwebtoken');
const OtpModel = require('../models/otp.model');
const RevokedTokenModel = require('../models/revoked-token');
const { createError, compareHashedValue } = require('../utils/helper.util');

// # Roles ID in database
const ROLE_SUPER_ADMIN = process.env.ROLE_SUPER_ADMIN;
const ROLE_ADMIN = process.env.ROLE_ADMIN;
const ROLE_DOCTOR = process.env.ROLE_DOCTOR;
const ROLE_STAFF = process.env.ROLE_STAFF;
const ROLE_EDITOR = process.env.ROLE_EDITOR;
const ROLE_PATIENT = process.env.ROLE_PATIENT;

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        if (!token) {
            createError(401, 'Không có quyền truy cập.');
        }

        const verifiedUser = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            { algorithms: ['HS256'] }
        );

        req.user = { id: verifiedUser.id, role: verifiedUser.role };

        next();
    } catch (error) {
        next(error);
    }
};

const verifyRefreshToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const refreshToken = authHeader && authHeader.split(' ')[1];
        if (!refreshToken) {
            createError(403, 'No refresh token found.');
        }

        const revokedToken = await RevokedTokenModel.findOne({
            token: refreshToken
        });

        if (revokedToken) {
            createError(403, 'Refresh token is expired.');
        }

        const verifiedUser = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            { algorithms: ['HS256'] }
        );

        if (!verifiedUser) {
            createError(403, 'Invalid refresh token.');
        }

        await RevokedTokenModel.create({
            token: refreshToken
        });

        req.user = { id: verifiedUser.id, role: verifiedUser.role };
        next();
    } catch (error) {
        next(error);
    }
};

const verifySuperAdmin = (req, res, next) => {
    verifyAccessToken(req, res, () => {
        if (req.user?.role?.toString() === ROLE_SUPER_ADMIN) {
            next();
        } else {
            createError(403, 'Không phải super admin.');
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyAccessToken(req, res, () => {
        if (req.user?.role?.toString() === ROLE_ADMIN) {
            next();
        } else {
            createError(403, 'Không phải admin.');
        }
    });
};

const resendOTP = async (req, res, next) => {
    let { phoneNumber } = req.body;
    const { phone } = req.params;
    try {
        if (phone) {
            phoneNumber = phone;
        }
        const checkPhoneNumber = await OtpModel.findOne({ phoneNumber });
        if (!checkPhoneNumber) {
            return next();
        }
        if (checkPhoneNumber.isExpired()) {
            createError(401, 'Yêu cầu gửi OTP quá nhiều.');
        }
        await OtpModel.deleteOne({ phoneNumber });
        next();
    } catch (error) {
        next(error);
    }
};

const verifyOTP = async (req, res, next) => {
    const { otpToken, OTP } = req.body;
    try {
        if (!otpToken || !OTP) {
            createError(403, 'Thiếu token hoặc OTP.');
        }

        const revokedToken = await RevokedTokenModel.findOne({
            token: otpToken
        });

        if (revokedToken) {
            createError(401, 'Token hết hạn.');
        }

        const verifiedToken = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);

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

        await RevokedTokenModel.create({
            token: otpToken
        });

        req.newUser = { phoneNumber, password, fullName };
        next();
    } catch (error) {
        next(error);
        console.log(error);
    }
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
    verifyAdmin,
    verifyOTP,
    resendOTP,
    verifySuperAdmin
};