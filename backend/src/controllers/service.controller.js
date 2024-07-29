const ServiceModel = require('../models/service.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllServices = async (req, res, next) => {
    try {
        const totalRecords = await ServiceModel.countDocuments({
            isDeleted: false,
        });
        const services = await ServiceModel.find({
            isDeleted: false,
        });

        if (!services.length) {
            createError(404, 'No services found.');
        }

        return res.status(200).json({
            page: 1,
            message: 'Services retrieved successfully.',
            data: services,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const service = await ServiceModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!service) {
            createError(404, 'Service not found.');
        }

        return res.status(200).json({
            message: 'Service retrieved successfully.',
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

const createService = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newService = await ServiceModel.create(req.body);

        return res.status(201).json({
            message: 'Service created successfully.',
            data: newService
        });
    } catch (error) {
        next(error);
    }
};

const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedService = await ServiceModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedService) {
            createError(404, 'Service not found.');
        }

        return res.status(201).json({
            message: 'Service updated successfully.',
            data: updatedService
        });
    } catch (error) {
        next(error);
    }
};

const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedService = await ServiceModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedService) {
            createError(404, 'Service not found.');
        }

        return res.status(200).json({
            message: 'Service deleted successfully.',
            data: deletedService
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};