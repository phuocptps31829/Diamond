const ServiceModel = require('../models/service.model');
const { createError, errorValidator } = require("../utils/helper.util");
const mongoose = require("mongoose");

const getAllServices = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await ServiceModel.countDocuments({
            isDeleted: false,
        });

        const services = await ServiceModel
            // .find({
            //     isDeleted: false,
            // })
            // .skip(skip)
            // .limit(limitDocuments)
            // .sort(sortOptions);;
            .aggregate([
                {
                    $lookup: {
                        from: 'Clinic', // Tên collection phòng khám
                        localField: 'specialtyId',
                        foreignField: 'specialtyId',
                        as: 'clinics'
                    }
                },
                {
                    $unwind: {
                        path: '$clinics',
                        preserveNullAndEmptyArrays: true
                    }
                }
                // ,
                // {
                //     $match: {
                //         'clinics.specialtyID': mongoose.Types.ObjectId('669e86f57fe9668357fcaead'), // Lọc theo branchId

                //         // isDeleted: false // Nếu bạn cần lọc các dịch vụ không bị xóa
                //     }
                // }
                // },
                // { $unwind: '$clinics' },
                // {
                //     $lookup: {
                //         from: 'Branch', // Tên collection chi nhánh
                //         localField: 'clinics.branchID',
                //         foreignField: '_id',
                //         as: 'branches'
                //     }
                // },
                // {
                //     $project: {
                //         _id: 0,
                //         serviceName: '$name',
                //         branches: '$branches'
                //     }
                // }
            ]);
        if (!services.length) {
            createError(404, 'No services found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Services retrieved successfully.',
            data: services,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getAllServicesBySpecialtyId = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;
        const { id } = req.params;

        const totalRecords = await ServiceModel.countDocuments({
            isDeleted: false,
            specialtyID: id,
        });
        const services = await ServiceModel
            .find({
                isDeleted: false,
                specialtyID: id,
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!services.length) {
            createError(404, 'No service found.');
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Service retrieved successfully.',
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
    deleteService,
    getAllServicesBySpecialtyId,

};