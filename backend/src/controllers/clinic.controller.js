const ClinicModel = require('../models/clinic.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllClinics: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await ClinicModel.countDocuments({ isDeleted: false });

            const clinics = await ClinicModel
                .find({ isDeleted: false })
                .populate("branchID")
                .populate("specialtyID")
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions)
                .lean();

            if (!clinics.length) {
                createError(404, "No clinics found.");
            }

            const clinicsPromises = clinics.map(clinic => {
                const formattedClinic = {
                    ...clinic,
                    branch: {
                        _id: clinic.branchID._id,
                        name: clinic.branchID.name,
                        coordinates: clinic.branchID.coordinates,
                        address: clinic.branchID.address,
                    },
                    specialty: {
                        _id: clinic.specialtyID._id,
                        name: clinic.specialtyID.name,
                    }
                };
                delete formattedClinic.branchID;
                delete formattedClinic.specialtyID;

                return formattedClinic;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Clinics retrieved successfully.',
                data: clinicsPromises,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getClinicByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const clinic = await ClinicModel
                .findOne({
                    isDeleted: false,
                    _id: id
                })
                .populate("branchID")
                .populate("specialtyID")
                .lean();

            if (!clinic) {
                createError(404, "Clinic not found.");
            }

            const formattedClinic = {
                ...clinic,
                branch: {
                    _id: clinic.branchID._id,
                    name: clinic.branchID.name,
                    coordinates: clinic.branchID.coordinates,
                    address: clinic.branchID.address,
                },
                specialty: {
                    _id: clinic.specialtyID._id,
                    name: clinic.specialtyID.name,
                }
            };
            delete formattedClinic.branchID;
            delete formattedClinic.specialtyID;

            return res.status(200).json({
                message: 'Clinic retrieved successfully.',
                data: formattedClinic,
            });
        } catch (error) {
            next(error);
        }
    },
};