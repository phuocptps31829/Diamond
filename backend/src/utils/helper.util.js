const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
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

const saveRefreshToken = (refreshToken, res) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 48 * 60 * 60 * 1000
    });
};

const comparePassword = async (password, hashedPassword) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);

    return validPassword;
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
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
    comparePassword,
    hashPassword,
    errorValidator,
    checkValidObjectId
};