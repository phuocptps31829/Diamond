const AppointmentModel = require('../models/appointment.model');
const { createError } = require("../utils/helper.util");
const mongoose = require("mongoose");

module.exports = {
    getAllAppointmentsOfDoctor: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            let { doctorID, startDay, endDay } = req.checkValueQuery;

            const pipeline = [
                {
                    $lookup: {
                        from: 'WorkSchedule',
                        localField: 'workScheduleID',
                        foreignField: '_id',
                        as: 'workSchedule'
                    }
                },
                {
                    $lookup: {
                        from: 'Invoice',
                        localField: '_id',
                        foreignField: 'appointmentID',
                        as: 'invoice'
                    }
                },
                {
                    $match: {
                        isDeleted: false,
                        'workSchedule.doctorID': new mongoose.Types.ObjectId(doctorID[0]),
                    },
                },
                {
                    $project: {
                        _id: 1,
                        appointmentDate: 1,
                        patientName: 1,
                        patientID: 1,
                        serviceID: 1,
                        medicalPackageID: 1,
                        type: 1,
                        time: 1,
                        status: 1,
                        appointmentHelpID: 1,
                        'workSchedule._id': 1,
                        'workSchedule.doctorID': 1,
                        'workSchedule.day': 1,
                        'workSchedule.hour.startTime': 1,
                        'workSchedule.hour.endTime': 1,
                        'invoice._id': 1,
                        'invoice.prescriptionID': 1,
                        'invoice.price': 1,
                        'invoice.arisePrice': 1,

                    }
                }
            ];
            if (startDay) {
                pipeline.push({
                    $match: {
                        time: { $gte: startDay },
                    }
                });
            }

            if (endDay) {
                pipeline.push({
                    $match: {
                        time: { $lte: endDay },
                    }
                });
            }
            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });

            const totalRecords = await AppointmentModel.aggregate(countPipeline);

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

            const Appointments = await AppointmentModel.aggregate(pipeline);

            if (!Appointments.length) {
                createError(404, 'No Appointments found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Appointments retrieved successfully.',
                data: Appointments,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllAppointments: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            let { startDay, endDay } = req.checkValueQuery;

            const pipeline = [
                {
                    $lookup: {
                        from: 'WorkSchedule',
                        localField: 'workScheduleID',
                        foreignField: '_id',
                        as: 'workSchedule'
                    }
                },
                {
                    $lookup: {
                        from: 'Invoice',
                        localField: '_id',
                        foreignField: 'appointmentID',
                        as: 'invoice'
                    }
                },
                {
                    $lookup: {
                        from: 'Patient',
                        localField: 'patientID',
                        foreignField: '_id',
                        as: 'patient'
                    }
                },
                {
                    $lookup: {
                        from: 'User',
                        localField: 'patient.userID',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $lookup: {
                        from: 'Result',
                        localField: '_id',
                        foreignField: 'appointmentID',
                        as: 'result'
                    }
                },
                {
                    $match: {
                        isDeleted: false
                    },
                }

            ];
            if (startDay) {
                pipeline.push({
                    $match: {
                        time: { $gte: startDay },
                    }
                });
            }

            if (endDay) {
                pipeline.push({
                    $match: {
                        time: { $lte: endDay },
                    }
                });
            }
            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });

            const totalRecords = await AppointmentModel.aggregate(countPipeline);

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

            const Appointments = await AppointmentModel.aggregate(pipeline);

            if (!Appointments.length) {
                createError(404, 'No Appointments found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Appointments retrieved successfully.',
                data: Appointments,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllAppointmentsForGenderYears: async (req, res, next) => {
        try {
            const appointments = await AppointmentModel
                .find({})
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate('patientID');

            const result = {};

            for (const appointment of appointments) {
                console.log(appointment);
                const { gender } = appointment.patientID;
                const year = new Date(appointment.time).getFullYear();
                const month = new Date(appointment.time).getMonth() + 1;

                if (!result[gender]) {
                    result[gender] = {};
                }

                if (!result[gender][year]) {
                    result[gender][year] = {
                        year,
                        months: []
                    };
                }

                let monthData = result[gender][year].months.find(m => m.month === month);
                if (!monthData) {
                    monthData = { month, count: 0 };
                    result[gender][year].months.push(monthData);
                }

                monthData.count += 1;
            }

            const formattedResult = Object.entries(result).map(([gender, yearsData]) => ({
                gender,
                years: Object.values(yearsData)
            }));

            return res.status(200).json({
                message: 'Appointments retrieved successfully.',
                data: formattedResult,
            });
        } catch (error) {
            next(error);
        }
    },
    getAllAppointmentsForSpecialty: async (req, res, next) => {
        try {
            const appointments = await AppointmentModel
                .find({})
                .populate('serviceID')
                .populate('medicalPackageID');

            const result = [];

            for (let i = 0; i < appointments.length; i++) {
                const item = appointments[i];
                const year = new Date(item.time).getFullYear().toString();
                const specialtyID = item.serviceID.specialtyID.toString();

                let yearObj = result.find(obj => obj.year === year);
                if (!yearObj) {
                    yearObj = {
                        year: year,
                        specialties: []
                    };
                    result.push(yearObj);
                }

                let specialtyObj = yearObj.specialties.find(spec => spec.specialtyID === specialtyID);
                if (!specialtyObj) {
                    specialtyObj = {
                        specialtyID,
                        totalCount: 0
                    };
                    yearObj.specialties.push(specialtyObj);
                }

                specialtyObj.totalCount += 1;
            }

            return res.status(200).json({
                message: 'Appointments retrieved successfully.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    getAllAppointmentsForAges: async (req, res, next) => {
        try {
            const appointments = await AppointmentModel
                .find({})
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate('patientID');

            const result = {};

            for (const appointment of appointments) {
                const { dateOfBirth } = appointment.patientID;

                console.log(new Date(dateOfBirth).getFullYear());
                const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
                const year = new Date(appointment.time).getFullYear();
                const month = new Date(appointment.time).getMonth() + 1;

                if (!result[age]) {
                    result[age] = {};
                }

                if (!result[age][year]) {
                    result[age][year] = {
                        year,
                        months: []
                    };
                }

                let monthData = result[age][year].months.find(m => m.month === month);
                if (!monthData) {
                    monthData = { month, count: 0 };
                    result[age][year].months.push(monthData);
                }

                monthData.count += 1;
            }

            const formattedResult = Object.entries(result).map(([age, yearsData]) => ({
                age: +age,
                years: Object.values(yearsData)
            }));

            return res.status(200).json({
                message: 'Appointments retrieved successfully.',
                data: formattedResult,
            });
        } catch (error) {
            next(error);
        }
    },
};