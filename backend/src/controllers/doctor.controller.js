const UserModel = require('../models/user.model');
const SpecialtyModel = require('../models/specialty.model');
const BranchModel = require('../models/branch.model');
const { createError } = require("../utils/helper.util");
const { default: mongoose } = require('mongoose');

module.exports = {
    getAllDoctors: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const totalRecords = await UserModel.countDocuments({
                isDeleted: false,
                roleID: process.env.ROLE_DOCTOR
            });
            const doctors = await UserModel
                .find({ isDeleted: false, roleID: process.env.ROLE_DOCTOR })
                .populate('roleID')
                .limit(limitDocuments)
                .skip(skip)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                })
                .lean();

            if (!doctors.length) {
                createError(404, 'No doctors found.');
            }

            let transformedDoctorsPromises = doctors.map(async doctor => {
                const specialty = await SpecialtyModel.findById(doctor.otherInfo.specialtyID);
                const branch = await BranchModel.findById(doctor.otherInfo.branchID);
                console.log(doctor.fullName, specialty, branch);
                doctor.role = {
                    _id: doctor.roleID._id,
                    name: doctor.roleID.name
                };
                doctor.otherInfo.specialty = {
                    _id: specialty._id,
                    name: specialty.name
                };
                doctor.otherInfo.branch = {
                    _id: branch._id,
                    name: branch.name
                };

                delete doctor.roleID;
                delete doctor.otherInfo.specialtyID;
                delete doctor.otherInfo.branchID;
                return doctor;
            });

            transformedDoctors = await Promise.all(transformedDoctorsPromises);

            return res.status(200).json({
                page: page || 1,
                message: 'Doctors retrieved successfully.',
                data: transformedDoctors,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getDoctorByID: async (req, res, next) => {
        try {
            const idParams = req.params?.id;
            const idMid = req.user?.id;

            const doctor = await UserModel
                .findOne({
                    isDeleted: false, _id: idParams || idMid,
                    roleID: process.env.ROLE_DOCTOR
                })
                .populate('roleID')
                .populate({
                    path: 'otherInfo.specialtyID',
                    model: SpecialtyModel
                })
                .populate({
                    path: 'otherInfo.branchID',
                    model: BranchModel
                })
                .lean();

            if (!doctor) {
                createError(404, 'User not found.');
            }

            doctor.role = {
                _id: doctor.roleID._id,
                name: doctor.roleID.name
            };
            doctor.otherInfo.specialty = {
                _id: doctor.otherInfo.specialtyID._id,
                name: doctor.otherInfo.specialtyID.name
            };
            doctor.otherInfo.branch = {
                _id: doctor.otherInfo.branchID._id,
                name: doctor.otherInfo.branchID.name
            };
            delete doctor.roleID;
            delete doctor.otherInfo.specialtyID;
            delete doctor.otherInfo.branchID;

            return res.status(200).json({
                message: 'Doctor retrieved successfully.',
                data: doctor,
            });
        } catch (error) {
            next(error);
        }
    },
    getDoctorBySpecialtyAndBranch: async (req, res, next) => {
        try {
            const { branchID, specialtyID } = req.query;
            console.log(branchID, specialtyID);
            if (!branchID || !specialtyID) {
                createError(400, "Branch ID and Specialty ID required");
            }

            const doctors = await UserModel.find({
                roleID: process.env.ROLE_DOCTOR,
                'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID),
                'otherInfo.branchID': new mongoose.Types.ObjectId(branchID),
                isDeleted: false,
                isActivated: true
            });

            console.log(doctors);
            return res.status(200).json({
                message: 'Doctors retrieved successfully.',
                data: doctors,
            });
        } catch (error) {
            next(error);
        }
    },
};