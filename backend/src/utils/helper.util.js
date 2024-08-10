const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const clientTwilio = require('twilio')('AC492411aa604146cb8685b9c7c90e2bc0', '9b34d81b7d23a6f952099b32522e62d4');


const createError = (statusCode, message) => {
    throw new createHttpError(statusCode, message);
};

const sendEmail = async (email, subject, html, attachments = []) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_SEND,
                pass: process.env.PASSWORD_EMAIL_SEND
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_SEND,
            to: email,
            subject: subject,
            html,
            attachments: attachments
        });
    } catch (error) {
        console.log(error);
        createError(500, 'Không thể gửi mail.');
    }
};

const sendOTP = async () => {
    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    });

    let msgOption = {
        from: '+19383566989',
        to: '+84916512235',
        body: 'ccc'
    };

    try {
        const message = await clientTwilio.messages.create(msgOption);
        console.log(message);
    } catch (error) {
        console.log(error);
    }

    console.log("OTP is: ", OTP);
    return OTP;
};

const generateAccessRefreshToken = user => {
    const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '2d' }
    );

    return { accessToken, refreshToken };
};

const generateOTPToken = ({ fullName, phoneNumber, password }) => {
    const otpToken = jwt.sign(
        {
            fullName,
            phoneNumber,
            password,
            expiresIn: Date.now() + 20000
        },
        'secret-key',
        { expiresIn: '60s' }
    );

    return otpToken;
};

const saveRefreshToken = (refreshToken, res) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 48 * 60 * 60 * 1000
    });
};

const compareHashedValue = async (value, hashedValue) => {
    const valid = await bcrypt.compare(value, hashedValue);
    return valid;
};

const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
};

const errorValidator = (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        error.statusCode = 400;
        throw error.array();
    }

    return true;
};

const checkValidObjectId = (id, type) => {
    if (!isValidObjectId(id)) {
        createError(400, `${type} ID is invalid.`);
    }

    return id;
};

module.exports = {
    createError,
    sendEmail,
    generateAccessRefreshToken,
    saveRefreshToken,
    compareHashedValue,
    hashValue,
    errorValidator,
    checkValidObjectId,
    sendOTP,
    generateOTPToken
};