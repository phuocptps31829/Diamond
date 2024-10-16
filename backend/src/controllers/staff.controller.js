const UserModel = require('../models/user.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllStaffs: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const totalRecords = await UserModel.countDocuments({
                isDeleted: false,
                roleID: process.env.ROLE_STAFF
            });
            const staffs = await UserModel
                .find({ isDeleted: false, roleID: process.env.ROLE_STAFF })
                .populate('roleID')
                .limit(limitDocuments)
                .skip(skip)
                .sort(sortOptions);

            if (!staffs.length) {
                createError(404, 'No staffs found.');
            }

            let transformedPatients = staffs.map(staff => {
                const staffObject = staff.toObject();
                staffObject.role = {
                    _id: staff.roleID._id,
                    name: staff.roleID.name
                };
                delete staffObject.roleID;
                return staffObject;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Staffs retrieved successfully.',
                data: transformedPatients,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getStaffByID: async (req, res, next) => {
        try {
            const idParams = req.params?.id;
            const idMid = req.user?.id;

            const staff = await UserModel
                .findOne({
                    isDeleted: false, _id: idParams || idMid,
                    roleID: process.env.ROLE_STAFF
                })
                .populate('roleID');

            if (!staff) {
                createError(404, 'Staff not found.');
            }

            const transformedStaff = staff.toObject();
            transformedStaff.role = transformedStaff.roleID;
            delete transformedStaff.roleID;

            return res.status(200).json({
                message: 'Staff retrieved successfully.',
                data: transformedStaff,
            });
        } catch (error) {
            next(error);
        }
    },
};