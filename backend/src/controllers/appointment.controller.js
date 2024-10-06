const mongoose = require("mongoose");
const AppointmentModel = require('../models/appointment.model');
const InvoiceModel = require('../models/invoice.model');
const OrderNumberModel = require('../models/order-number.model');
const ResultModel = require('../models/result.model');
const PrescriptionModel = require('../models/prescription.model');
const { createError } = require("../utils/helper.util");

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

            // const pipeline = [
            //     {
            //         $lookup: {
            //             from: 'WorkSchedule',
            //             localField: 'workScheduleID',
            //             foreignField: '_id',
            //             as: 'workSchedule'
            //         }
            //     },
            //     {
            //         $lookup: {
            //             from: 'Invoice',
            //             localField: '_id',
            //             foreignField: 'appointmentID',
            //             as: 'invoice'
            //         }
            //     },
            //     {
            //         $lookup: {
            //             from: 'User',
            //             localField: 'userID',
            //             foreignField: '_id',
            //             as: 'patient'
            //         }
            //     },
            //     {
            //         $lookup: {
            //             from: 'Result',
            //             localField: '_id',
            //             foreignField: 'appointmentID',
            //             as: 'result'
            //         }
            //     },
            //     {
            //         $match: {
            //             isDeleted: false
            //         },
            //     }

            // ];
            // if (startDay) {
            //     pipeline.push({
            //         $match: {
            //             time: { $gte: startDay },
            //         }
            //     });
            // }

            // if (endDay) {
            //     pipeline.push({
            //         $match: {
            //             time: { $lte: endDay },
            //         }
            //     });
            // }
            // const countPipeline = [...pipeline];
            // countPipeline.push({
            //     $count: "totalRecords"
            // });

            // const totalRecords = await AppointmentModel.aggregate(countPipeline);

            // console.log(totalRecords);
            // if (sortOptions && Object.keys(sortOptions).length > 0) {
            //     pipeline.push({
            //         $sort: sortOptions
            //     });
            // }

            // pipeline.push(
            //     {
            //         $skip: skip
            //     },
            //     {
            //         $limit: limitDocuments
            //     }
            // );

            // const Appointments = await AppointmentModel.aggregate(pipeline);

            const appointments = await AppointmentModel
                .find({ isDeleted: false })
                .populate('patientID')
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'doctorID'
                    }
                });

            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

            const formattedAppointments = appointments.map(appointment => {
                const appointmentObj = appointment.toObject();
                const formattedAppointment = {
                    ...appointmentObj,
                    patient: {
                        _id: appointmentObj.patientID._id,
                        fullName: appointmentObj.patientID.fullName,
                    },
                    doctor: {
                        _id: appointmentObj.workScheduleID.doctorID._id,
                        fullName: appointmentObj.workScheduleID.doctorID.fullName
                    },
                    ...(appointmentObj.serviceID ? {
                        service: {
                            _id: appointmentObj.serviceID._id,
                            name: appointmentObj.serviceID.name
                        }
                    } : {}),
                    ...(appointmentObj.medicalPackageID ? {
                        service: {
                            _id: appointmentObj.medicalPackageID._id,
                            name: appointmentObj.medicalPackageID.name
                        }
                    } : {})
                };
                delete formattedAppointment.serviceID;
                delete formattedAppointment.medicalPackageID;
                delete formattedAppointment.patientID;
                delete formattedAppointment.workScheduleID;

                return formattedAppointment;
            });

            console.log(formattedAppointments);

            return res.status(200).json({
                page: page || 1,
                message: 'Appointments retrieved successfully.',
                data: formattedAppointments,
                totalRecords: formattedAppointments.length
            });
        } catch (error) {
            next(error);
        }
    },
    getAllAppointmentsForGenderYears: async (req, res, next) => {
        try {
            const appointments = await AppointmentModel
                .find({ isDeleted: false })
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate('patientID');

            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

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
                .find({ isDeleted: false })
                .populate('serviceID')
                .populate('medicalPackageID');

            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

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
                .find({ isDeleted: false })
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate('patientID');

            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

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
    getAppointmentByID: async (req, res, next) => {
        const { id } = req.params;
        try {
            const appointment = await AppointmentModel
                .findOne({ _id: id, isDeleted: false })
                .populate('serviceID')
                .populate('medicalPackageID')
                .populate('patientID')
                .populate('workScheduleID');

            if (!appointment) {
                createError(404, 'Appointment not found');
            }

            const [invoice, result, orderNumber] = await Promise.all([
                InvoiceModel.findOne({ appointmentID: appointment._id, isDeleted: false }),
                ResultModel.findOne({ appointmentID: appointment._id, isDeleted: false }),
                OrderNumberModel.findOne({ appointmentID: appointment._id, isDeleted: false }),
            ]);

            const prescription = invoice
                ? await PrescriptionModel
                    .findOne({ isDeleted: false, invoiceID: invoice._id }) : null;

            const appointmentObj = appointment.toObject();
            const invoiceObj = invoice.toObject();
            const resultObj = result.toObject();
            const orderNumberObj = orderNumber.toObject();
            const prescriptionObj = prescription?.toObject();

            const formattedAppointment = {
                ...appointmentObj,
                patient: {
                    _id: appointmentObj.patientID._id,
                    fullName: appointmentObj.patientID.fullName,
                },
                doctor: {
                    _id: appointmentObj.workScheduleID.doctorID._id,
                    fullName: appointmentObj.workScheduleID.doctorID.fullName
                },
                ...(appointmentObj.serviceID ? {
                    service: {
                        _id: appointmentObj.serviceID._id,
                        name: appointmentObj.serviceID.name
                    }
                } : {}),
                ...(appointmentObj.medicalPackageID ? {
                    service: {
                        _id: appointmentObj.medicalPackageID._id,
                        name: appointmentObj.medicalPackageID.name
                    }
                } : {}),
                orderNumber: {
                    number: orderNumberObj.number,
                    priority: orderNumberObj.priority,
                },
                result: {
                    diagnose: resultObj.diagnose,
                    images: resultObj.images,
                    description: resultObj.description,
                },
                invoice: {
                    price: invoiceObj.price,
                    arisePrice: invoiceObj?.arisePrice || 0,
                },
                prescription: {
                    advice: prescriptionObj.advice,
                    medicines: prescriptionObj.medicines,
                }
            };

            delete formattedAppointment.serviceID;
            delete formattedAppointment.medicalPackageID;
            delete formattedAppointment.patientID;
            delete formattedAppointment.workScheduleID;

            return res.status(200).json({
                message: 'Appointment retrieved successfully.',
                data: formattedAppointment,
            });
        } catch (error) {
            next(error);
        }
    }
};