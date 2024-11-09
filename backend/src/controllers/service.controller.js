const ServiceModel = require('../models/service.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllServices: async (req, res, next) => {
        try {
            const notHidden = req.query.notHidden === 'true';
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;
            let { branchID, specialtyID, gender } = req.checkValueQuery;

            const queryOptions = {
                ...(branchID ? { branchID } : {}),
                ...(specialtyID ? { specialtyID } : {}),
                ...(gender ? { "applicableObject.gender": gender } : {})
            };

            const totalRecords = await ServiceModel
                .countDocuments({
                    isDeleted: false,
                    ...(notHidden ? { isHidden: false } : {}),
                    ...queryOptions
                });
            console.log("totalRecords: ", totalRecords);
            const services = await ServiceModel
                .find({
                    isDeleted: false,
                    ...(notHidden ? { isHidden: false } : {}),
                    ...queryOptions
                })
                .populate('specialtyID')
                .limit(limitDocuments)
                .skip(skip)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                })
                .lean();

            if (!services.length) {
                createError(404, 'No services found.');
            }

            const formattedServices = services.map(service => {
                const formattedService = {
                    ...service,
                    specialty: {
                        _id: service.specialtyID._id,
                        name: service.specialtyID.name,
                    }
                };

                delete formattedService.specialtyID;
                return formattedService;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Services retrieved successfully.',
                data: formattedServices,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllServicesBySpecialtyId: async (req, res, next) => {
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
    },
    getServiceById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const service = await ServiceModel
                .findOne({
                    _id: id,
                    isDeleted: false,
                })
                .populate("specialtyID")
                .lean();


            if (!service) {
                createError(404, 'Service not found.');
            }

            const formattedService = {
                ...service,
                specialty: {
                    _id: service.specialtyID._id,
                    name: service.specialtyID.name,
                }
            };
            delete formattedService.specialtyID;

            return res.status(200).json({
                message: 'Service retrieved successfully.',
                data: formattedService,
            });
        } catch (error) {
            next(error);
        }
    },
    getServiceBySlug: async (req, res, next) => {
        try {
            const { slug } = req.params;

            const service = await ServiceModel
                .findOne({
                    slug: slug,
                    isDeleted: false,
                })
                .populate("specialtyID")
                .lean();

            if (!service) {
                createError(404, 'Service not found.');
            }

            const formattedService = {
                ...service,
                specialty: {
                    _id: service.specialtyID._id,
                    name: service.specialtyID.name,
                }
            };
            delete formattedService.specialtyID;

            return res.status(200).json({
                message: 'Service retrieved successfully.',
                data: formattedService,
            });
        } catch (error) {
            next(error);
        }
    },
};