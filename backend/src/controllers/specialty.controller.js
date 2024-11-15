const SpecialtyModel = require('../models/specialty.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllSpecialties: async (req, res, next) => {
        try {
            const notHidden = req.query.notHidden === 'true';
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const totalRecords = await SpecialtyModel.countDocuments({
                isDeleted: false,
                ...(notHidden ? { isHidden: false } : {}),
            });

            const specialties = await SpecialtyModel
                .find({
                    isDeleted: false,
                    ...(notHidden ? { isHidden: false } : {}),
                })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!specialties.length) {
                createError(404, 'No specialties found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Specialties retrieved successfully.',
                data: specialties,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllSpecialtiesWithServices: async (req, res, next) => {
        try {
            const totalRecords = await SpecialtyModel.countDocuments({
                isDeleted: false,
            });
            const specialties = await SpecialtyModel.aggregate([
                {
                    $match: { isDeleted: false }

                }, {
                    $lookup: {
                        from: 'Service',
                        localField: '_id',
                        foreignField: 'specialtyID',
                        as: 'services'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        image: 1,
                        services: {
                            $map: {
                                input: '$services',
                                as: 'service',
                                in: { _id: "$$service._id", name: '$$service.name', price: "$$service.price" } // Lấy trường name của Service và đổi tên thành serviceName
                            }
                        }
                    }
                }
            ]);
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
    },
    getSpecialtyById: async (req, res, next) => {
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
    }
};