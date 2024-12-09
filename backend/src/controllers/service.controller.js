const ServiceModel = require('../models/service.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllServices: async (req, res, next) => {
        try {
            const notHidden = req.query.notHidden === 'true';
            let { limitDocuments, skip, page, sortOptions, search } = req.customQueries;
            let { branch, specialtyID, gender } = req.checkValueQuery;
            let noPaginated = req.query?.noPaginated === 'true';

            const queryOptions = {
                ...(branch ? {
                    branchID: {
                        $in: branch
                    }
                } : {}),
                ...(specialtyID ? {
                    specialtyID: {
                        $in: specialtyID
                    }
                } : {}),
                ...(gender ? { "applicableObject.gender": gender } : {}),
            };

            const services = await ServiceModel
                .find({
                    ...(notHidden ? { isHidden: false } : {}),
                    ...queryOptions
                })
                .populate('specialtyID')
                .sort({
                    ...sortOptions,
                    createdAt: -1,
                })
                .lean();

            let formattedServices = services.map(service => {
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

            if (search) {
                formattedServices = formattedServices.filter(service => {
                    return service.name.toLowerCase().includes(search.toLowerCase()) ||
                        service.specialty.name.toLowerCase().includes(search.toLowerCase());
                });
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Services retrieved successfully.',
                data: noPaginated ? formattedServices : formattedServices.slice(skip, skip + limitDocuments),
                totalRecords: formattedServices.length
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
                specialtyID: id,
            });
            const services = await ServiceModel
                .find({
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