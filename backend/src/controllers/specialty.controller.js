const SpecialtyModel = require('../models/specialty.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllSpecialties = async (req, res, next) => {
    try {
        const totalRecords = await SpecialtyModel.countDocuments({
            isDeleted: false,
        });
        const specialties = await SpecialtyModel.find({
            isDeleted: false,
        });

        if (!specialties.length) {
            createError(404, 'No specialties found.');
        }

        return res.status(200).json({
            page: 1,
            message: 'Specialties retrieved successfully.',
            data: specialties,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getSpecialtyById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const specialty = await SpecialtyModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!specialty) {
            createError(404, 'Specialty not found.');
        }

        return res.status(200).json({
            message: 'Specialty retrieved successfully.',
            data: specialty,
        });
    } catch (error) {
        next(error);
    }
};

const createSpecialty = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newSpecialty = await SpecialtyModel.create(req.body);

        return res.status(201).json({
            message: 'Specialty created successfully.',
            data: newSpecialty
        });
    } catch (error) {
        next(error);
    }
};

const updateSpecialty = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedSpecialty = await SpecialtyModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedSpecialty) {
            createError(404, 'Specialty not found.');
        }

        return res.status(201).json({
            message: 'Specialty updated successfully.',
            data: updatedSpecialty
        });
    } catch (error) {
        next(error);
    }
};

const deleteSpecialty = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedSpecialty = await SpecialtyModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedSpecialty) {
            createError(404, 'Specialty not found.');
        }

        return res.status(200).json({
            message: 'Specialty deleted successfully.',
            data: deletedSpecialty
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSpecialties,
    getSpecialtyById,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty
};