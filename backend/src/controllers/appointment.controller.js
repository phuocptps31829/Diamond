const mongoose = require("mongoose");
const AppointmentModel = require('../models/appointment.model');
const InvoiceModel = require('../models/invoice.model');
const MedicalPackageModel = require('../models/medical-package.model');
const OrderNumberModel = require('../models/order-number.model');
const ResultModel = require('../models/result.model');
const PrescriptionModel = require('../models/prescription.model');
const MedicineModel = require('../models/medicine.model');
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

            const appointments = await AppointmentModel
                .find({ isDeleted: false })
                .populate('patientID')
                .populate('serviceID')
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'doctorID'
                    }
                })
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'clinicID'
                    }
                })
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'clinicID',
                        populate: {
                            path: 'branchID'
                        }
                    }
                })
                .lean();

            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

            const formattedAppointmentsPromises = appointments.map(async appointment => {
                const result = await ResultModel
                    .findOne({ isDeleted: false, appointmentID: appointment._id })
                    .lean();

                let medicalPackage = null;
                let level = null;
                if (appointment?.medicalPackageID) {
                    medicalPackage = await MedicalPackageModel
                        .findOne({
                            isDeleted: false,
                            'services._id': appointment.medicalPackageID
                        });
                    level = medicalPackage?.services.find(s => s._id.toString() === appointment.medicalPackageID.toString());
                }

                const formattedAppointment = {
                    ...appointment,
                    patient: {
                        _id: appointment.patientID?._id,
                        fullName: appointment.patientID.fullName,
                        avatar: appointment.patientID.avatar,
                    },
                    doctor: {
                        _id: appointment.workScheduleID.doctorID?._id,
                        fullName: appointment.workScheduleID.doctorID.fullName
                    },
                    clinic: {
                        _id: appointment.workScheduleID.clinicID?._id,
                        name: appointment.workScheduleID.clinicID.name
                    },
                    branch: {
                        _id: appointment.workScheduleID.clinicID.branchID?._id,
                        name: appointment.workScheduleID.clinicID.branchID.name
                    },
                    result: {
                        diagnose: result?.diagnose || 'Chưa có',
                        images: result?.images || 'Chưa có',
                        description: result?.description || 'Chưa có',
                    },
                    ...(appointment.serviceID ? {
                        service: {
                            _id: appointment.serviceID._id,
                            name: appointment.serviceID.name,
                            image: appointment.serviceID.image,
                            price: appointment.serviceID.price
                        }
                    } : {}),
                    ...(medicalPackage ? {
                        medicalPackage: {
                            _id: medicalPackage?._id,
                            name: medicalPackage.name,
                            image: medicalPackage.image,
                            level: {
                                _id: level?._id,
                                name: level.levelName,
                                price: level.price
                            },
                        }
                    } : {})
                };
                delete formattedAppointment.serviceID;
                delete formattedAppointment.medicalPackageID;
                delete formattedAppointment.patientID;
                delete formattedAppointment.workScheduleID;
                console.log(formattedAppointment);
                return formattedAppointment;
            });

            const formattedAppointments = await Promise.all(formattedAppointmentsPromises);

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
                .populate('serviceID');

            console.log('all', appointments);
            if (!appointments.length) {
                createError(404, 'No Appointments found.');
            }

            const result = [];

            for (let i = 0; i < appointments.length; i++) {
                console.log(i);
                const item = appointments[i];

                let medicalPackage = null;
                if (appointments[i]?.medicalPackageID) {
                    medicalPackage = await MedicalPackageModel
                        .findOne({
                            isDeleted: false,
                            'services._id': appointments[i].medicalPackageID
                        });
                }

                console.log(item, 'ok');
                const year = new Date(item.time).getFullYear().toString();
                const specialtyID = item?.serviceID
                    ? item.serviceID.specialtyID.toString()
                    : medicalPackage.specialtyID.toString();

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
                .findOne({
                    _id: id,
                    isDeleted: false
                })
                .populate('serviceID')
                .populate('patientHelpID')
                .populate('patientID')
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'doctorID'
                    }
                })
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'clinicID'
                    }
                })
                .populate({
                    path: 'workScheduleID',
                    populate: {
                        path: 'clinicID',
                        populate: {
                            path: 'branchID'
                        }
                    }
                })
                .lean();

            if (!appointment) {
                createError(404, 'Appointment not found');
            }

            let medicalPackage = null;
            let level = null;

            if (appointment?.medicalPackageID) {
                medicalPackage = await MedicalPackageModel
                    .findOne({
                        isDeleted: false,
                        'services._id': appointment.medicalPackageID
                    });
                level = medicalPackage?.services.find(s => s._id.toString() === appointment.medicalPackageID.toString());
            }

            const [invoice, result, orderNumber] = await Promise.all([
                InvoiceModel
                    .findOne({ appointmentID: appointment._id, isDeleted: false })
                    .lean(),
                ResultModel
                    .findOne({ appointmentID: appointment._id, isDeleted: false })
                    .lean(),
                OrderNumberModel
                    .findOne({ appointmentID: appointment._id, isDeleted: false })
                    .lean(),
            ]);

            // Kiểm tra kết quả trả về
            console.log('Invoice:', invoice);
            console.log('Result:', result);
            console.log('OrderNumber:', orderNumber);

            const prescription = invoice
                ? await PrescriptionModel
                    .findOne({ isDeleted: false, invoiceID: invoice._id })
                    .lean() : null;

            const prescriptionMedicines = await Promise.all(prescription ? prescription.medicines.map(async m => {
                const medicine = await MedicineModel
                    .findById({ _id: m.medicineID })
                    .populate("medicineCategoryID")
                    .lean();

                delete medicine.createdAt;
                delete medicine.updatedAt;
                delete medicine.isDeleted;
                delete medicine.__v;

                const formattedMedicine = {
                    ...medicine,
                    medicineCategory: {
                        _id: medicine.medicineCategoryID._id,
                        name: medicine.medicineCategoryID.name
                    }
                };
                delete formattedMedicine.medicineCategoryID;

                return formattedMedicine;
            }) : []);

            const formattedAppointment = {
                ...appointment,
                patient: {
                    _id: appointment.patientID._id,
                    fullName: appointment.patientID.fullName,
                    avatar: appointment.patientID.avatar,
                },
                doctor: {
                    _id: appointment.workScheduleID.doctorID._id,
                    fullName: appointment.workScheduleID.doctorID.fullName
                },
                clinic: {
                    _id: appointment.workScheduleID.clinicID._id,
                    name: appointment.workScheduleID.clinicID.name
                },
                branch: {
                    _id: appointment.workScheduleID.clinicID.branchID._id,
                    name: appointment.workScheduleID.clinicID.branchID.name
                },
                ...(appointment.serviceID ? {
                    service: {
                        _id: appointment.serviceID._id,
                        name: appointment.serviceID.name,
                        image: appointment.serviceID.image,
                        price: appointment.serviceID.price,
                    }
                } : {}),
                ...(medicalPackage ? {
                    medicalPackage: {
                        _id: medicalPackage._id,
                        name: medicalPackage.name,
                        image: medicalPackage.image,
                        level: {
                            _id: level._id,
                            name: level.levelName,
                            price: level.price
                        },
                    }
                } : {}),
                orderNumber: {
                    number: orderNumber?.number,
                    priority: orderNumber?.priority,
                },
                result: {
                    diagnose: result?.diagnose || 'Chưa có',
                    images: result?.images || 'Chưa có',
                    description: result?.description || 'Chưa có',
                },
                invoice: {
                    price: invoice?.price || 0,
                    arisePrice: invoice?.arisePrice || 0,
                },
                ...(prescription ? {
                    prescription: {
                        advice: prescription.advice,
                        medicines: prescriptionMedicines
                    }
                } : {}),
                ...(appointment.patientHelpID ? {
                    helper: {
                        _id: appointment.patientHelpID._id,
                        fullName: appointment.patientHelpID.fullName
                    }
                } : {}),
            };

            delete formattedAppointment.serviceID;
            delete formattedAppointment.medicalPackageID;
            delete formattedAppointment.workScheduleID;
            delete formattedAppointment.patientID;
            delete formattedAppointment.patientHelpID;

            return res.status(200).json({
                message: 'Appointment retrieved successfully.',
                data: formattedAppointment,
            });
        } catch (error) {
            next(error);
        }
    }
};