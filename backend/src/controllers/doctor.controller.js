const UserModel = require('../models/user.model');
const SpecialtyModel = require('../models/specialty.model');
const WorkScheduleModel = require('../models/work-schedule.model');
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
                sortOptions,
                search
            } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';
            const { specialtyID, gender } = req.query;

            const searchQuery = search ? {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                ]
            } : {};
            const totalRecords = await UserModel.countDocuments({
                roleID: process.env.ROLE_DOCTOR,
                ...specialtyID && {
                    'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID)
                },
                ...gender && {
                    gender
                },
                ...searchQuery
            });
            const doctors = await UserModel
                .find({
                    roleID: process.env.ROLE_DOCTOR,
                    ...specialtyID && {
                        'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID)
                    },
                    ...gender && {
                        gender
                    },
                    ...searchQuery
                })
                .populate('roleID')
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
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
                    _id: idParams || idMid,
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
            if (!branchID || !specialtyID) {
                createError(400, "Branch ID and Specialty ID required");
            }

            const doctors = await UserModel.find({
                roleID: process.env.ROLE_DOCTOR,
                'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID),
                'otherInfo.branchID': new mongoose.Types.ObjectId(branchID),

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
    getBySpecialty: async (req, res, next) => {
        try {
            const { specialtyID } = req.query;
            if (!specialtyID) {
                createError(400, "specialty ID required");
            }

            const doctors = await UserModel.find({
                roleID: process.env.ROLE_DOCTOR,
                'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID),

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
    getAvailableDoctorsByDayHour: async (req, res, next) => {
        try {
            const { branchID, specialtyID, day, hour } = req.query;

            if (!branchID || !specialtyID) {
                createError(400, "Branch ID and Specialty ID required");
            }

            const doctors = await UserModel.find({
                roleID: process.env.ROLE_DOCTOR,
                'otherInfo.specialtyID': new mongoose.Types.ObjectId(specialtyID),
                'otherInfo.branchID': new mongoose.Types.ObjectId(branchID),

                isActivated: true
            });

            const workSchedulesAvailable = await Promise.all(
                doctors.map(async doctor => {
                    const workSchedule = await WorkScheduleModel
                        .findOne({

                            doctorID: doctor._id,

                            day: {
                                $gte: new Date().toISOString().slice(0, 10)
                            }
                        })
                        .populate('doctorID');

                    return workSchedule;
                })
            );

            let filteredWorkSchedules = workSchedulesAvailable;
            if (day && hour) {
                filteredWorkSchedules = workSchedulesAvailable.filter(schedule => {
                    if (!schedule) return false;

                    const tempTimeStart = new Date()
                        .setTime(schedule.hour.startTime.split(":")[0], schedule.hour.startTime.split(":")[1], 0, 0);
                    const tempTimeEnd = new Date()
                        .setTime(schedule.hour.endTime.split(":")[0], schedule.hour.endTime.split(":")[1], 0, 0);
                    const tempTimeInput = new Date()
                        .setTime(hour.split(":")[0], hour.split(":")[1], 0, 0);

                    return schedule.day === day && tempTimeInput >= tempTimeStart && tempTimeInput <= tempTimeEnd;
                });
            }

            const availableDoctors = filteredWorkSchedules.map(schedule => {
                if (!schedule) return null;
                return {
                    _id: schedule.doctorID._id,
                    workScheduleID: schedule._id,
                    fullName: schedule.doctorID.fullName,
                };
            });

            // console.log('workSchedulesAvailable', filteredWorkSchedules);

            return res.status(200).json({
                message: 'Doctors retrieved successfully.',
                data: availableDoctors,
            });
        } catch (error) {
            next(error);
        }
    },
};