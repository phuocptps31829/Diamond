const HospitalModel = require('../models/hospital.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllHospitals: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await HospitalModel.countDocuments({ isDeleted: false });
            let noPaginated = req.query?.noPaginated === 'true';

            const hospitals = await HospitalModel
                .find({ isDeleted: false })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!hospitals.length) {
                createError(404, "No hospitals found.");
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Hospitals retrieved successfully.',
                data: hospitals,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getHospitalByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const hospital = await HospitalModel.findOne({
                isDeleted: false,
                _id: id
            });

            if (!hospital) {
                createError(404, "Hospital not found.");
            }

            return res.status(200).json({
                message: 'Hospital retrieved successfully.',
                data: hospital,
            });
        } catch (error) {
            next(error);
        }
    },
};