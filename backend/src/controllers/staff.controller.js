const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');
const { createError } = require("../utils/helper.util");

const staffReceptionist = process.env.ROLE_STAFF_RECEPTIONIST;
const staffEditor = process.env.ROLE_STAFF_EDITOR;
const staffAccountant = process.env.ROLE_STAFF_ACCOUNTANT;

module.exports = {
    getAllStaffs: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const totalRecords = await UserModel.countDocuments({
                isDeleted: false,
                roleID: {
                    $in: [staffReceptionist, staffEditor, staffAccountant]
                }
            });
            const staffs = await UserModel
                .find({
                    isDeleted: false,
                    roleID: {
                        $in: [staffReceptionist, staffEditor, staffAccountant]
                    }
                })
                .populate('roleID')
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!staffs.length) {
                createError(404, 'No staffs found.');
            }

            let transformedStaffs = staffs.map(staff => {
                const staffObject = staff.toObject();
                staffObject.role = {
                    _id: staff.roleID._id,
                    name: staff.roleID.name,
                    isSystem: staff.roleID.isSystem,
                };
                delete staffObject.roleID;
                return staffObject;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Staffs retrieved successfully.',
                data: transformedStaffs,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getStaffsByRole: async (req, res, next) => {
        try {
            const { roleName } = req.params;

            const role = await RoleModel
                .findOne({
                    isDeleted: false,
                    name: roleName.toUpperCase()
                })
                .lean();

            if (!role) {
                createError(404, 'Role not found.');
            }

            const staffs = await UserModel
                .find({
                    isDeleted: false,
                    roleID: role._id
                })
                .populate('roleID');

            if (!staffs.length) {
                createError(404, 'Staffs not found.');
            }

            let transformedStaff = staffs.map(staff => {
                const staffObject = staff.toObject();
                staffObject.role = {
                    _id: staff.roleID._id,
                    name: staff.roleID.name,
                    isSystem: staff.roleID.isSystem,
                };
                delete staffObject.roleID;
                return staffObject;
            });

            return res.status(200).json({
                message: 'Staff retrieved successfully.',
                data: transformedStaff,
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
                    isDeleted: false,
                    _id: idParams || idMid,
                })
                .populate('roleID');

            if (!staff) {
                createError(404, 'Staff not found.');
            }

            const transformedStaff = staff.toObject();
            transformedStaff.role = {
                _id: staff.roleID._id,
                name: staff.roleID.name,
                isSystem: staff.roleID.isSystem,
            };
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