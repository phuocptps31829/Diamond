const RoleModel = require('../models/role.model');
const UserModel = require('../models/user.model');
const SpecialtyModel = require('../models/specialty.model');
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
                .limit(limitDocuments)
                .skip(skip)
                .sort(sortOptions);

            if (!users.length) {
                createError(404, 'No users found.');
            }

            let transformedUsers = users.map(user => {
                const userObject = user.toObject();
                userObject.role = {
                    _id: role._id,
                    name: role.name
                };
                delete userObject.roleID;
                return userObject;
            });

            if (name === "DOCTOR") {
                const specialtyPromises = transformedUsers.map(async (doctor) => {
                    const specialty = await SpecialtyModel.findById(doctor.otherInfo.specialtyID);
                    doctor.otherInfo.specialty = {
                        _id: specialty._id,
                        name: specialty.name
                    };
                    delete doctor.otherInfo.specialtyID;
                    return doctor;
                });

                transformedUsers = await Promise.all(specialtyPromises);
            }

            if (name === "PATIENT") {
                const relatedPatientsPromises = transformedUsers.map(async (patient) => {
                    let relatedPatients = [];
                    if (patient.otherInfo?.relatedPatientsID?.length) {
                        const fetchRelatedPatientsPromises = patient.otherInfo.relatedPatientsID.map(async (id) => {
                            const relatedPatient = await UserModel.findById(id);
                            return relatedPatient ? {
                                _id: relatedPatient._id,
                                name: relatedPatient.fullName
                            } : null;
                        });

                        relatedPatients = await Promise.all(fetchRelatedPatientsPromises);
                        relatedPatients = relatedPatients.filter(Boolean);
                    }
                    patient.otherInfo.relatedPatients = relatedPatients;
                    delete patient.otherInfo?.relatedPatientsID;
                    return patient;
                });

                transformedUsers = await Promise.all(relatedPatientsPromises);
            }

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
            const idParams = req.params?.id;
            const idMid = req.user?.id;

            const user = await UserModel
                .findOne({ isDeleted: false, _id: idParams || idMid })
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