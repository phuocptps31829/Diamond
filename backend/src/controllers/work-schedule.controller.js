const WorkScheduleModel = require('../models/work-schedule.model');
const AppointmentModel = require('../models/appointment.model');
const { createError, timeDivision } = require("../utils/helper.util");
const mongoose = require("mongoose");

module.exports = {
    getAllWorkSchedules: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions,
                search
            } = req.customQueries;

            let noPaginated = req.query?.noPaginated === 'true';

            const workSchedules = await WorkScheduleModel
                .find({})
                .populate("doctorID")
                .populate({
                    path: 'clinicID',
                    populate: {
                        path: 'branchID',
                    }
                })
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            const groupedByDoctor = workSchedules.reduce((acc, schedule) => {
                const doctorId = schedule.doctorID._id.toString();
                if (!acc[doctorId]) {
                    acc[doctorId] = {
                        doctor: schedule.doctorID,
                        schedules: [],
                        count: 0
                    };
                }

                acc[doctorId].schedules.push(schedule);
                acc[doctorId].count += 1;
                return acc;
            }, {});

            const groupedArray = Object.values(groupedByDoctor);
            let formattedGroupedArray = groupedArray.map(group => {
                const { doctor, schedules } = group;
                const formattedGroup = {
                    _id: doctor._id,
                    fullName: doctor.fullName,
                    email: doctor.email,
                    phoneNumber: doctor.phoneNumber,
                    address: doctor.address,
                    avatar: doctor.avatar,
                    branch: {
                        _id: schedules[0].clinicID.branchID._id,
                        name: schedules[0].clinicID.branchID.name,
                    },
                    schedules: schedules.map(schedule => ({
                        _id: schedule._id,
                        day: schedule.day,
                        hour: schedule.hour,
                        clinic: {
                            _id: schedules[0].clinicID._id,
                            name: schedules[0].clinicID.name,
                        }
                    })),
                };

                return formattedGroup;
            });

            if (search) {
                formattedGroupedArray = formattedGroupedArray.filter(group => {
                    return group.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        group.email.toLowerCase().includes(search.toLowerCase()) ||
                        group.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                        group.branch.name.toLowerCase().includes(search.toLowerCase());
                });
            }

            return res.status(200).json({
                page: page || 1,
                message: 'WorkSchedule retrieved successfully.',
                data: noPaginated ? formattedGroupedArray : formattedGroupedArray.slice(skip, skip + limitDocuments),
                totalRecords: formattedGroupedArray.length
            });
        } catch (error) {
            next(error);
        }
    },
    getAllWorkScheduleOfDoctor: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            let { date } = req.checkValueQuery;

            const pipeline = [
                {
                    $match: {

                    }
                },
                {
                    $lookup: {
                        from: 'Clinic',
                        let: { clinicID: '$clinicID' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$clinicID'] } } },
                            { $project: { _id: 1, name: 1, branchID: 1, specialtyID: 1 } }
                        ],
                        as: 'clinics'
                    }
                },
                {
                    $lookup: {
                        from: 'Branch',
                        let: { branchID: { $arrayElemAt: ['$clinics.branchID', 0] } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$branchID'] } } },
                            { $project: { _id: 1, name: 1, workingTime: 1 } }
                        ],
                        as: 'branch'
                    }
                },
                {
                    $lookup: {
                        from: 'Appointment',
                        localField: '_id',
                        foreignField: 'workScheduleID',
                        as: 'appointments'
                    }
                },
                {
                    $addFields: {
                        appointmentsCount: { $size: "$appointments" }
                    }
                },
                {
                    $match: {
                        appointmentsCount: { $lte: 9 }
                    }
                }
            ];

            if (date) {
                pipeline.push({
                    $match: {
                        day: date,
                    }
                });
            }
            // pipeline.push({
            //     $group: {
            //         _id: { day: "$day" },
            //         doctorID: { $first: "$doctorID" },
            //         hour: {
            //             $push: {
            //                 time: "$hour",
            //                 workScheduleID: "$_id",
            //                 clinicID: "$clinics",
            //                 branchID: "$branch",
            //             }
            //         },
            //     }
            // });

            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });

            const totalRecords = await WorkScheduleModel.aggregate(countPipeline);

            if (sortOptions && Object.keys(sortOptions).length > 0) {
                pipeline.push({
                    $sort: sortOptions
                });
            }

            pipeline.push(
                {
                    $skip: skip
                },
                {
                    $limit: limitDocuments
                }
            );

            const workSchedule = await WorkScheduleModel.aggregate(pipeline);

            if (!workSchedule.length) {
                createError(404, 'No work schedule found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'WorkSchedule retrieved successfully.',
                data: workSchedule,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllWorkScheduleWithDoctor: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const { day, hour } = req.query;
            let { doctorID, startDay, endDay } = req.checkValueQuery;

            const workSchedules = await WorkScheduleModel
                .find({
                    doctorID: doctorID,
                    day: {
                        $gt: new Date().toISOString().slice(0, 10)
                    }
                })
                .populate("doctorID")
                .populate("clinicID")
                .lean();

            if (!workSchedules.length) {
                createError(404, 'No work schedule found.');
            }

            const formattedWorkSchedules = workSchedules.map(w => {
                const result = {
                    ...w,
                    doctor: {
                        _id: w.doctorID._id,
                        fullName: w.doctorID.fullName,
                    },
                    clinic: {
                        _id: w.clinicID._id,
                        name: w.clinicID.name,
                    }
                };
                delete result.doctorID;
                delete result.clinicID;

                return result;
            });

            formattedWorkSchedules.map(element => {
                const arrTime = timeDivision(element.hour.startTime, element.hour.endTime);
                element.time = arrTime;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'WorkSchedules retrieved successfully.',
                data: formattedWorkSchedules,
                // totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllWorkScheduleWithBranch: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            let { startDay, endDay, branchID, specialtyID } = req.checkValueQuery;

            const pipeline = [
                {
                    $match: {

                    }
                },
                {
                    $lookup: {
                        from: 'Clinic',
                        localField: 'clinicID',
                        foreignField: '_id',
                        as: 'clinics'
                    }
                },
                {
                    $lookup: {
                        from: 'Appointment',
                        localField: '_id',
                        foreignField: 'workScheduleID',
                        as: 'appointments'
                    }
                },
                {
                    $addFields: {
                        appointmentsCount: { $size: "$appointments" }
                    }
                },
                {
                    $match: {
                        appointmentsCount: { $lte: 10 }
                    }
                }

            ];

            if (startDay) {
                pipeline.push({
                    $match: {
                        day: { $gte: startDay },
                    }
                });
            }

            if (endDay) {
                pipeline.push({
                    $match: {
                        day: { $lte: endDay },
                    }
                });
            }
            if (branchID && specialtyID) {
                pipeline.push({
                    $match: {
                        'clinics.branchID': new mongoose.Types.ObjectId(branchID[0]),
                        'clinics.specialtyID': new mongoose.Types.ObjectId(specialtyID[0]),
                    }
                });
            }
            pipeline.push({
                $group: {
                    _id: { day: "$day" },
                    doctorID: { $first: "$doctorID" },
                    hour: {
                        $push: {
                            time: "$hour",
                            workScheduleID: "$_id",
                            clinicID: "$clinicID"
                        }
                    },
                }
            });
            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });
            const totalRecords = await WorkScheduleModel.aggregate(countPipeline);

            if (sortOptions && Object.keys(sortOptions).length > 0) {
                pipeline.push({
                    $sort: sortOptions
                });
            }

            pipeline.push(
                {
                    $skip: skip
                },
                {
                    $limit: limitDocuments
                }
            );

            const workSchedule = await WorkScheduleModel.aggregate(pipeline);
            // workSchedule.forEach(element => {

            //     element.hour = element.hour.map(item => {

            //         const arrTime = timeDivision(item.time.startTime, item.time.endTime);

            //         return {
            //             ...item,
            //             time: arrTime
            //         };
            //     });

            // });
            if (!workSchedule.length) {
                createError(404, 'No work schedule found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'WorkSchedule retrieved successfully.',
                data: workSchedule,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getWorkScheduleByDetailId: async (req, res, next) => {
        try {
            const { id } = req.params;

            const workSchedule = await WorkScheduleModel
                .findOne({
                    'detail._id': id,

                })
                .populate({
                    path: 'doctorID',

                });


            if (!workSchedule) {
                createError(404, 'WorkSchedule not found.');
            }

            return res.status(200).json({
                message: 'WorkSchedule retrieved successfully.',
                data: workSchedule,
            });
        } catch (error) {
            next(error);
        }
    },
    getWorkScheduleById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const workSchedule = await WorkScheduleModel
                .aggregate(
                    [{
                        $match: {
                            '_id': new mongoose.Types.ObjectId(id),
                            'isDeleted': false
                        }
                    }, {
                        $lookup: {
                            from: 'Clinic',
                            localField: 'clinicID',
                            foreignField: '_id',
                            as: 'clinics'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Doctor',
                            localField: 'doctorID',
                            foreignField: '_id',
                            as: 'doctors'
                        }
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'doctors.userID',
                            foreignField: '_id',
                            as: 'users'
                        }
                    }]
                );

            if (!workSchedule) {
                createError(404, 'WorkSchedule not found.');
            }

            return res.status(200).json({
                message: 'WorkSchedule retrieved successfully.',
                data: workSchedule,
            });
        } catch (error) {
            next(error);
        }
    },
    getWorkScheduleByDoctorId: async (req, res, next) => {
        try {
            const { id } = req.params;

            const workSchedules = await WorkScheduleModel
                .find({ doctorID: id, })
                .populate({
                    path: 'doctorID',
                    populate: {
                        path: 'otherInfo.specialtyID',
                        model: 'Specialty'
                    }
                })
                .populate({
                    path: 'doctorID',
                    populate: {
                        path: 'otherInfo.branchID',
                        model: 'Branch'
                    }
                })
                .populate({
                    path: 'clinicID',
                    populate: {
                        path: 'branchID',
                    }
                });

            if (!workSchedules.length) {
                return res.status(200).json({
                    message: 'WorkSchedule retrieved successfully.',
                    data: [],
                });
            }

            const groupedByDoctor = workSchedules.reduce((acc, schedule) => {
                const doctorId = schedule.doctorID._id.toString();
                if (!acc[doctorId]) {
                    acc[doctorId] = {
                        doctor: schedule.doctorID,
                        schedules: [],
                        count: 0
                    };
                }

                acc[doctorId].schedules.push(schedule);
                acc[doctorId].count += 1;
                return acc;
            }, {});

            const groupedArray = Object.values(groupedByDoctor);
            const formattedGroupedArray = await Promise.all(groupedArray.map(async group => {
                const { doctor, schedules } = group;

                const schedulesDetail = await Promise.all(schedules.map(async (schedule) => {
                    const appointments = await AppointmentModel
                        .find({
                            workScheduleID: schedule._id,
                        })
                        .populate('patientID');

                    return {
                        _id: schedule._id,
                        day: schedule.day,
                        hour: schedule.hour,
                        clinic: {
                            _id: schedules[0].clinicID._id,
                            name: schedules[0].clinicID.name,
                        },
                        appointments: appointments.map(appointment => ({
                            _id: appointment._id,
                            patient: appointment.patientID.fullName,
                            time: appointment.time,
                            status: appointment.status,
                        })),
                    };
                }));

                const formattedGroup = {
                    _id: doctor._id,
                    fullName: doctor.fullName,
                    email: doctor.email,
                    phoneNumber: doctor.phoneNumber,
                    address: doctor.address,
                    avatar: doctor.avatar,
                    specialty: {
                        _id: doctor.otherInfo.specialtyID._id,
                        name: doctor.otherInfo.specialtyID.name,
                    },
                    branch: {
                        _id: doctor.otherInfo.branchID._id,
                        name: doctor.otherInfo.branchID.name,
                    },
                    schedules: schedulesDetail,
                };

                return formattedGroup;
            }));

            return res.status(200).json({
                message: 'WorkSchedule retrieved successfully.',
                data: formattedGroupedArray,
            });
        } catch (error) {
            next(error);
        }
    }
};