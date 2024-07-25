const MedicalPackageModel = require('../models/medical-package.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllMedicalPackages = async (req, res, next) => {
    try {
        const totalRecords = await MedicalPackageModel.countDocuments({
            isDeleted: false,
        });
        const medicalPackages = await MedicalPackageModel.find({
            isDeleted: false,
        });

        if (!medicalPackages.length) {
            createError(404, 'No medical packages found.');
        }

        return res.status(200).json({
            page: 1,
            message: 'Medical packages retrieved successfully.',
            data: medicalPackages,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getMedicalPackageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const medicalPackage = await MedicalPackageModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!medicalPackage) {
            createError(404, 'Medical package not found.');
        }

        return res.status(200).json({
            message: 'Medical package retrieved successfully.',
            data: medicalPackage,
        });
    } catch (error) {
        next(error);
    }
};

const createMedicalPackage = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newMedicalPackage = await MedicalPackageModel.create(req.body);

        return res.status(201).json({
            message: 'Medical package created successfully.',
            data: newMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

const updateMedicalPackage = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedMedicalPackage = await MedicalPackageModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedMedicalPackage) {
            createError(404, 'Medical package not found.');
        }

        return res.status(201).json({
            message: 'Medical package updated successfully.',
            data: updatedMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

const deleteMedicalPackage = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMedicalPackage = await MedicalPackageModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedMedicalPackage) {
            createError(404, 'Medical package not found.');
        }

        return res.status(200).json({
            message: 'Medical package deleted successfully.',
            data: deletedMedicalPackage
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMedicalPackages,
    getMedicalPackageById,
    createMedicalPackage,
    updateMedicalPackage,
    deleteMedicalPackage
};