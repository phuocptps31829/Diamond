const ApplicableObjectModel = require('../models/applicable-object.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllApplicableObjects = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ApplicableObjectModel.countDocuments({
            isDeleted: false,
        });
        const applicableObjects = await ApplicableObjectModel
            .find({
                isDeleted: false,
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!applicableObjects.length) {
            createError(404, 'No applicable objects found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Applicable objects successfully.',
            data: applicableObjects,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getApplicableObjectById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const applicableObject = await ApplicableObjectModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!applicableObject) {
            createError(404, 'Applicable object not found.');
        }

        return res.status(200).json({
            message: 'Applicable object retrieved successfully.',
            data: applicableObject,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllApplicableObjects,
    getApplicableObjectById,
};