const ResultModel = require('../models/clinic.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllResults: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await ResultModel.countDocuments({ isDeleted: false });

            const results = await ResultModel
                .find({ isDeleted: false })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!results.length) {
                createError(404, "No results found.");
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Results retrieved successfully.',
                data: results,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getResultByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const result = await ResultModel.findOne({
                isDeleted: false,
                _id: id
            });

            if (!result) {
                createError(404, "Result not found.");
            }

            return res.status(200).json({
                message: 'Result retrieved successfully.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
};