const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const createError = (statusCode, message) => {
    throw new createHttpError(statusCode, message);
};

const sendEmail = async (email, subject, text, attachments = []) => {
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
            text: text,
            attachments: attachments
        });
    } catch (error) {
        console.log(error);
        createError(500, 'Không thể gửi mail.');
    }
};

function getAccessToken() {

    const apiKeySid = process.env.API_KEY_SID;
    const apiKeySecret = process.env.API_KEY_SECRET;

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;

    const header = { cty: "stringee-api;v=1" };
    const payload = {
        jti: apiKeySid + "-" + now,
        iss: apiKeySid,
        exp: exp,
        rest_api: 1
    };

    const token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header });
    return token;
}

const sendOTP = async ({ phoneNumber }) => {

    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    });

    const talkOTP = OTP.split('').join('... ');
    const newPhoneNumber = await phoneNumber.substring(1);
    const options = {
        method: 'POST',
        url: process.env.URL_CALL,
        headers: {
            'Content-Type': 'application/json',
            'X-STRINGEE-AUTH': getAccessToken(),  // Thêm tiêu đề xác thực
        },
        data: {
            "from": {
                "type": "external",
                "number": process.env.PHONE_NUMBER,
                "alias": "STRINGEE_NUMBER"
            },
            "to": [
                {
                    "type": "external",
                    "number": '84' + newPhoneNumber,
                    "alias": "TO_NUMBER"
                }
            ],
            "answer_url": process.env.ANSWER_URL,
            "actions": [
                {
                    "action": "talk",
                    "text": "Mã OTP của bạn là:..." + talkOTP + "... Xin nhắc lại... Mã OTP của bạn là:..." + talkOTP
                }
            ]
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    console.log("OTP is: ", OTP);
    return OTP;
};

const generateAccessRefreshToken = user => {
    const accessToken = jwt.sign(
        {
            id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
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
            expiresIn: Date.now() + 300000
        },
        'secret-key',
        { expiresIn: '5m' }
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