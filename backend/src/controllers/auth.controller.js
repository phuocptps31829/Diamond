const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const OtpModel = require('../models/otp.model');
const { createError,
    saveRefreshToken,
    generateAccessRefreshToken,
    hashPassword,
    sendEmail,
    errorValidator,
    sendOTP,
    generateOTPToken,
    hashValue,
    compareHashedValue
} = require('../utils/helper.util');

const checkPhoneNumberAndEmail = async (item, hasEmail = true) => {
    const { phoneNumber, email } = item;
    console.log('item:', phoneNumber);
    if (!phoneNumber || !phoneNumber.trim()) {
        createError(400, 'Phone number is required');
    }

    if (hasEmail) {
        if ((!email) || !email.trim() === '') {
            createError(400, 'Email is required');
        }
    }

    if (email && email.trim() !== '') {
        const getExistingUserByEmail = await UserModel.findOne({ email });
        if (getExistingUserByEmail) {
            createError(400, 'Email already exists');
        }
    }

    if (phoneNumber && phoneNumber.trim() !== '') {
        const getExistingUserByPhoneNumber = await UserModel.findOne({ phoneNumber });
        if (getExistingUserByPhoneNumber) {
            createError(400, 'Phone number already exists');
        }
    }
};

const createOTP = async (req, res, next) => {
    try {
        errorValidator(req, res);

        console.log({ ...req.body });

        await checkPhoneNumberAndEmail(req.body, false);
        const OTP = await sendOTP({ ...req.body });

        const hashedOTP = await hashValue(OTP);

        await OtpModel.create({
            otp: hashedOTP,
            phoneNumber: req.body.phoneNumber
        });

        const otpToken = generateOTPToken({ ...req.body });

        return res.status(201).json({
            message: 'New OTP is created successfully.',
            otpToken
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const user = await UserModel.findOne({
            phoneNumber: req.body.phoneNumber
        });

        if (!user) {
            createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
        }

        const validPassword = await compareHashedValue(req.body.password, user.password);

        if (!validPassword) {
            createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
        }

        const { accessToken, refreshToken } = generateAccessRefreshToken(user);

        // user.refreshToken = {
        //     token: refreshToken,
        //     expired: Date.now() + 48 * 60 * 60 * 1000
        // };

        // await user.save();

        // saveRefreshToken(refreshToken, res);

        return res.status(200).json({
            message: 'User logged in successfully.',
            data: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        if (!res.cookie('refreshToken')) {
            return res.status(204).send();
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: true,
        });

        await UserModel.findByIdAndUpdate(
            req.user.id,
            { refreshToken: {} }
        );

        return res.status(200).json({
            message: 'User logged out.'
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            createError(403, 'No refresh token found.');
        }

        const userToken = await UserModel.findOne({
            'refreshToken.token': refreshToken,
            'refreshToken.expired': { $gt: Date.now() }
        });

        if (!userToken) {
            createError(403, 'Refresh token is expired.');
        }

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!user) {
            createError(403, 'Invalid refresh token.');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateAccessRefreshToken({ ...user, _id: user.id });

        saveRefreshToken(newRefreshToken, res);

        userToken.refreshToken = {
            token: newRefreshToken,
            expired: Date.now() + 48 * 60 * 60 * 1000
        };

        await userToken.save();

        return res.status(200).json({
            newAccessToken
        });
    } catch (err) {
        next(err);
    }
};

// const updateProfile = async (req, res, next) => {
//     try {
//         // const { id } = req.params;
//         const { id } = req.user;

//         const updatedUser = await UserModel.findByIdAndUpdate(id, {
//             ...req.body,
//         }, { new: true });

//         if (!updatedUser) {
//             createError(404, "User not found");
//         }

//         return res.status(200).json({
//             message: 'User updated successfully.',
//             totalRecords: 1,
//             data: updatedUser
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const changePassword = async (req, res, next) => {
//     try {
//         const { id } = req.user;

//         const hashedPassword = await hashPassword(req.body.newPassword);

//         await UserModel.findByIdAndUpdate(id, {
//             password: hashedPassword
//         }, { new: true });

//         return res.status(200).json({
//             message: 'User password updated successfully.',
//             totalRecords: 1,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// const changeRole = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { isAdmin } = req.body;

//         const updatedUser = await UserModel.findByIdAndUpdate(id, {
//             isAdmin: isAdmin
//         }, { new: true });

//         if (!updatedUser) {
//             createError(404, "User not found");
//         }

//         return res.status(200).json({
//             message: 'User role updated successfully.',
//             totalRecords: 1,
//             data: updatedUser
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const sendOTPForgotPassword = async (req, res, next) => {
    try {
        const { phone } = req.params;

        const userFound = await UserModel.findOne({ phoneNumber: phone, isActivated: true });

        if (!userFound) {
            createError(404, "Phone number not found.");
        }

        const OTP = await sendOTP({ phoneNumber: phone });

        const hashedOTP = await hashValue(OTP);

        await OtpModel.create({
            otp: hashedOTP,
            phoneNumber: phone
        });

        const otpToken = generateOTPToken({
            fullName: userFound.fullName,
            phoneNumber: userFound.phoneNumber,
            password: userFound.password
        });

        return res.status(201).json({
            message: 'New OTP is created successfully.',
            otpToken
        });
    } catch (error) {
        next(error);
    }
};

const checkOTPForgotPassword = async (req, res, next) => {
    try {

        const { OTP, otpToken } = req.body;
        return res.status(201).json({
            message: 'OTP is correct',
            data: { OTP, otpToken }
        });
    } catch (error) {
        next(error);
    }
};


const forgotPassword = async (req, res, next) => {
    try {

        const { phoneNumber } = req.newUser;

        const userFound = await UserModel.findOne({ phoneNumber, isActivated: true });

        if (!userFound) {
            createError(404, "Phone number not found.");
        }
        const hashedPassword = await hashValue(req.body.password);

        const newUser = await UserModel.findOneAndUpdate(
            { phoneNumber },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        console.log(newUser);
        return res.status(201).json({
            message: 'Updated user successfully',
            user: newUser
        });
    } catch (error) {
        next(error);
    }
};

const googleCallback = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = generateAccessRefreshToken(req.user);

        const user = await UserModel.findOne({
            email: req.user.email
        });

        // user.refreshToken = {
        //     token: refreshToken,
        //     expired: Date.now() + 48 * 60 * 60 * 1000
        // };

        // await user.save();

        // saveRefreshToken(refreshToken, res);

        return res.redirect(`${process.env.CLIENT_LOCAL_URL}?accessToken=${accessToken}`);
    } catch (error) {
        next(error);
    }
};

const facebookCallback = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = generateAccessRefreshToken(req.user);
        console.log(accessToken);
        const user = await UserModel.findOne({
            email: req.user.email
        });

        // user.refreshToken = {
        //     token: refreshToken,
        //     expired: Date.now() + 48 * 60 * 60 * 1000
        // };

        // await user.save();

        // saveRefreshToken(refreshToken, res);

        return res.redirect(`${process.env.CLIENT_LOCAL_URL}?accessToken=${accessToken}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    logout,
    refreshToken,
    googleCallback,
    facebookCallback,
    createOTP,
    // updateProfile,
    forgotPassword,
    sendOTPForgotPassword,
    checkOTPForgotPassword
    // changeRole,
    // changePassword
};