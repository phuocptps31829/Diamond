
const DoctorModel = require('../models/doctor.model');
const UserModel = require('../models/user.model');
const { createError, errorValidator, hashPassword, sendOTP } = require("../utils/helper.util");
const checkPhoneNumberAndEmail = async (item, hasEmail = true) => {
    const { phoneNumber, email } = item;
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

const createUser = async (req, res, next) => {
    try {
        console.log(req.newUser);
        errorValidator(req, res);

        // Gửi otp và xác thực nếu thành công mới tạo tài khoản

        // await checkPhoneNumberAndEmail(req.body, req.isCreateDoctor);
        // const hashedPassword = await hashPassword(req.body.password);
        // const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
        // req.newUser = newUser;
        // next();
    } catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { phoneNumber, email } = req.body;

        errorValidator(req, res);
        const doctor = await DoctorModel.findOne({ _id: id }).populate({
            path: 'userID',
            match: { isDeleted: false }
        });
        if (!doctor || !doctor.userID) {
            createError(404, 'User not found.');
        }
        const userID = doctor.userID._id;
        // kiểm tra sdt và email không được để trống cả 2
        if ((!email && !phoneNumber) || (email.trim() === '' && phoneNumber.trim() === '')) {
            createError(400, 'Email or phone number is required');
        }

        // Nếu số điện thoại có và kiểm tra sdt mới có trùng với user khác không
        if (phoneNumber) {
            const getExistingUserByPhoneNumber = await UserModel.findOne({ phoneNumber: phoneNumber, _id: { $ne: userID } });
            if (getExistingUserByPhoneNumber) {
                createError(400, 'Phone number already exists');
            }
        }

        // Nếu email có và kiểm tra email mới có trùng với user khác không
        if (email) {
            const getExistingUserByEmail = await UserModel.findOne({ email: email, _id: { $ne: userID } });
            if (getExistingUserByEmail) {
                createError(400, 'Email already exists');
            }
        }
        const hashedPassword = await hashPassword(req.body.password);
        const updatedUser = await UserModel.findOneAndUpdate(
            {
                _id: userID,
                isDeleted: false,
            },
            { ...req.body, password: hashedPassword },
            { new: true }
        );
        req.updatedUser = updatedUser;
        next();

    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorModel.findOne({ _id: id }).populate({
            path: 'userID',
            match: { isDeleted: false }
        });
        if (!doctor || !doctor.userID) {
            createError(404, 'User not found.');
        }
        const userID = doctor.userID._id;
        const deletedUser = await UserModel.findOneAndUpdate(
            { _id: userID, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedUser) {
            createError(404, 'User not found.');
        }
        req.deletedUser = deletedUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,

};