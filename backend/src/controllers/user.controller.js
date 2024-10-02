const RoleModel = require('../models/role.model');
const UserModel = require('../models/user.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const totalRecords = await UserModel.countDocuments({
                isDeleted: false,
            });
            const users = await UserModel
                .find({ isDeleted: false })
                .limit(limitDocuments)
                .skip(skip)
                .sort(sortOptions);

            if (!users.length) {
                createError(404, 'No users found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Users retrieved successfully.',
                data: users,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllUsersByRole: async (req, res, next) => {
        try {
            const { name } = req.params;

            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const role = await RoleModel.findOne({ name: name });

            const users = await UserModel
                .find({ isDeleted: false, roleID: role._id })
                .populate('roleID')
                .limit(limitDocuments)
                .skip(skip)
                .sort(sortOptions);

            if (!users.length) {
                createError(404, 'No users found.');
            }

            const transformedUsers = users.map(user => {
                const userObject = user.toObject();
                userObject.role = userObject.roleID;
                delete userObject.roleID;
                return userObject;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Users retrieved successfully.',
                data: transformedUsers,
            });
        } catch (error) {
            next(error);
        }
    },
    getUserByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await UserModel
                .findOne({ isDeleted: false, _id: id })
                .populate('roleID');

            if (!user) {
                createError(404, 'User not found.');
            }

            const transformedUser = user.toObject();
            transformedUser.role = transformedUser.roleID;
            delete transformedUser.roleID;

            return res.status(200).json({
                message: 'User retrieved successfully.',
                data: transformedUser,
            });
        } catch (error) {
            next(error);
        }
    },
};