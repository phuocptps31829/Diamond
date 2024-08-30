const WorkScheduleModel = require('../models/work-schedule.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllWorkSchedule = async (req, res, next) => {
    try {
        const {
            limitDocuments,
            page,
            skip,
            sortOptions
        } = req.customQueries;

        const totalRecords = await WorkScheduleModel.countDocuments({
            isDeleted: false,
        });
        const workSchedule = await WorkScheduleModel
            .find({ isDeleted: false })
            .limit(limitDocuments)
            .skip(skip)
            .sort(sortOptions);

        if (!workSchedule.length) {
            createError(404, 'No workSchedule found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'WorkSchedule retrieved successfully.',
            data: workSchedule,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getAllWorkScheduleWithDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            limitDocuments,
            page,
            skip,
            sortOptions
        } = req.customQueries;

        const totalRecords = await WorkScheduleModel.countDocuments({
            isDeleted: false,
        });

        const workSchedule = await WorkScheduleModel
            .find({
                isDeleted: false,
                doctorID: id,
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!workSchedule.length) {
            createError(404, 'No workSchedule found.');
        }

        return res.status(200).json({
            page: 1,
            message: 'WorkSchedule retrieved successfully.',
            data: workSchedule,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getWorkScheduleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const workSchedule = await WorkScheduleModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!workSchedule) {
            createError(404, 'WorkSchedule not found.');
        }

        return res.status(200).json({
            message: 'WorkSchedule retrieved successfully.',
            data: workSchedule,
        });
    } catch (error) {
        next(error);
    }
};

const createWorkSchedule = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newWorkSchedule = await WorkScheduleModel.create(req.body);

        return res.status(201).json({
            message: 'WorkSchedule created successfully.',
            data: newWorkSchedule
        });
    } catch (error) {
        next(error);
    }
};

const updateWorkSchedule = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedWorkSchedule = await WorkScheduleModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedWorkSchedule) {
            createError(404, 'WorkSchedule not found.');
        }

        return res.status(201).json({
            message: 'WorkSchedule updated successfully.',
            data: updatedWorkSchedule
        });
    } catch (error) {
        next(error);
    }
};

const deleteWorkSchedule = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedWorkSchedule = await WorkScheduleModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedWorkSchedule) {
            createError(404, 'WorkSchedule not found.');
        }

        return res.status(200).json({
            message: 'WorkSchedule deleted successfully.',
            data: deletedWorkSchedule
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllWorkSchedule,
    getWorkScheduleById,
    createWorkSchedule,
    updateWorkSchedule,
    deleteWorkSchedule,
    getAllWorkScheduleWithDoctor
};