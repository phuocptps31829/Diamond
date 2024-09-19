const AppointmentModel = require('../models/appointment.model');
const { createError, errorValidator } = require("../utils/helper.util");
const mongoose = require("mongoose");

const createAppointment = (req, res, next) => {
    try {
        errorValidator(req, res);
    } catch (error) {
        next(error);
    }
};

const getAllAppointmentsOfDoctor = async (req, res, next) => {
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
};

module.exports = {
    getAllAppointmentsOfDoctor,
};