const WorkScheduleModel = require('../models/work-schedule.model');
const { createError, timeDivision } = require("../utils/helper.util");
const mongoose = require("mongoose");

module.exports = {
    getAllWorkSchedule: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const totalRecords = await WorkScheduleModel.countDocuments({
                isDeleted: false,
            });

            const workSchedule = await WorkScheduleModel
                .find({ isDeleted: false })
                .limit(limitDocuments)
                .skip(skip)
                .sort(sortOptions);

            if (!workSchedule.length) {
                createError(404, 'No workSchedule found.');
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
                        isDeleted: false
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

            console.log(totalRecords);
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

            let { doctorID, startDay, endDay, branchID } = req.checkValueQuery;

            const pipeline = [
                {
                    $match: {
                        isDeleted: false,
                        doctorID: new mongoose.Types.ObjectId(doctorID[0])
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
                        from: 'Branch',
                        localField: 'clinics.branchID',
                        foreignField: '_id',
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
            if (branchID) {
                pipeline.push({
                    $match: {
                        'clinics.branchID': new mongoose.Types.ObjectId(branchID[0])
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
                            clinicID: "$clinics"
                        }
                    },
                }
            });

            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });

            const totalRecords = await WorkScheduleModel.aggregate(countPipeline);

            console.log(totalRecords);
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

            workSchedule.forEach(element => {

                element.hour = element.hour.map(item => {

                    const arrTime = timeDivision(item.time.startTime, item.time.endTime);

                    return {
                        ...item,
                        time: arrTime
                    };
                });

            });

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
                        isDeleted: false,
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

            console.log(totalRecords);
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
                    isDeleted: false,
                })
                .populate({
                    path: 'doctorID',
                    isDeleted: false,
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
};