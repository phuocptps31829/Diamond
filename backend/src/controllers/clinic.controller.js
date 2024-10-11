const ClinicModel = require('../models/clinic.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllClinics: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await ClinicModel.countDocuments({ isDeleted: false });

            const clinics = await ClinicModel
                .find({ isDeleted: false })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!clinics.length) {
                createError(404, "No clinics found.");
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Clinics retrieved successfully.',
                data: clinics,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getClinicByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const clinic = await ClinicModel.findOne({
                isDeleted: false,
                _id: id
            });

            if (!clinic) {
                createError(404, "Clinic not found.");
            }

            return res.status(200).json({
                message: 'Clinic retrieved successfully.',
                data: clinic,
            });
        } catch (error) {
            next(error);
        }
    },
};