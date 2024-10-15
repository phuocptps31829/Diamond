const mongoose = require('mongoose');
const MedicalPackageModel = require('../models/medical-package.model');
const ServiceModel = require('../models/service.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllMedicalPackages: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;
            let { branchID, specialtyID, gender } = req.checkValueQuery;

            const pipeline = [
                {
                    $unwind: '$services'
                },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        shortDescription: { $first: '$shortDescription' },
                        details: { $first: '$details' },
                        specialtyID: { $first: '$specialtyID' },
                        services: { $push: '$services' },
                        minDiscountPrice: { $min: '$services.discountPrice' },
                        isHidden: { $first: '$isHidden' },
                        isDeleted: { $first: '$isDeleted' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        slug: { $first: '$slug' },
                        image: { $first: '$image' },
                        orderCount: { $first: '$orderCount' }
                    }
                },
                ...(sortOptions && Object.keys(sortOptions).length ?
                    sortOptions['discountPrice'] ? [{
                        $sort: {
                            minDiscountPrice: sortOptions['discountPrice']
                        }
                    }] : [{
                        $sort: sortOptions
                    }] : []),
                {
                    $project: {
                        minDiscountPrice: 0
                    }
                },
                {
                    $lookup: {
                        from: "Clinic",
                        localField: "specialtyID",
                        foreignField: "specialtyID",
                        as: "clinicInfo"
                    }
                },
                {
                    $lookup: {
                        from: "ApplicableObject",
                        localField: "_id",
                        foreignField: "medicalPackageID",
                        as: "ApplicableObjectInfo"
                    }
                },
                {
                    $lookup: {
                        from: "Specialty",
                        localField: "specialtyID",
                        foreignField: "_id",
                        as: "specialty"
                    }
                },
                {
                    $match: {
                        isDeleted: false,
                        ...(specialtyID && { specialtyID: { $in: specialtyID.map(id => new mongoose.Types.ObjectId(id)) } }),
                    }
                }

            ];

            if (gender) {
                pipeline.push({
                    $match: {
                        $or: [
                            { "ApplicableObjectInfo.gender": gender },
                            { "ApplicableObjectInfo": { $exists: true, $size: 0 } },
                            { "ApplicableObjectInfo": { $exists: false } }
                        ]
                    }
                });
            }

            if (branchID) {
                pipeline.push({
                    $match: {
                        "clinicInfo.branchID": { $all: branchID.map(id => new mongoose.Types.ObjectId(id)) },
                        "clinicInfo.isDeleted": false,
                    }
                });
            }

            const countPipeline = [...pipeline];
            countPipeline.push({
                $count: "totalRecords"
            });
            pipeline.push(
                {
                    $skip: skip
                },
                {
                    $limit: limitDocuments
                }
            );
            const totalRecords = await MedicalPackageModel.aggregate(countPipeline);

            const medicalPackages = await MedicalPackageModel.aggregate(pipeline);

            if (!medicalPackages.length) {
                createError(404, 'No medical packages found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Medical packages retrieved successfully.',
                data: medicalPackages,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getAllMedicalPackagesBySpecialtyId: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;
            const { id } = req.params;

            const totalRecords = await MedicalPackageModel.countDocuments({
                isDeleted: false,
                specialtyID: id,
            });
            const medicalPackages = await MedicalPackageModel
                .find({
                    isDeleted: false,
                    specialtyID: id,
                })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!medicalPackages.length) {
                createError(404, 'No medical packages found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Medical packages retrieved successfully.',
                data: medicalPackages,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getMedicalPackageById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const medicalPackage = await MedicalPackageModel
                .findOne({
                    _id: id,
                    isDeleted: false,
                })
                .lean()
                .populate("specialtyID");

            if (!medicalPackage) {
                createError(404, 'Medical package not found.');
            }

            const arrayServices = medicalPackage.services.sort((a, b) => {
                return b.servicesID.length - a.servicesID.length;
            });

            const services = await ServiceModel
                .find({
                    _id: { $in: arrayServices[0].servicesID },
                    isDeleted: false,
                }, {
                    _id: 1, name: 1
                });

            const formattedMedicalPackage = {
                ...medicalPackage,
                allServices: services
            };

            formattedMedicalPackage.specialty = {
                _id: formattedMedicalPackage.specialtyID._id,
                name: formattedMedicalPackage.specialtyID.name
            };
            delete formattedMedicalPackage.specialtyID;

            return res.status(200).json({
                message: 'Medical package retrieved successfully.',
                data: formattedMedicalPackage,
            });
        } catch (error) {
            next(error);
        }
    },
    getMedicalPackageBySlug: async (req, res, next) => {
        try {
            const { slug } = req.params;

            const medicalPackage = await MedicalPackageModel
                .findOne({
                    slug: slug,
                    isDeleted: false,
                })
                .populate("specialtyID")
                .lean();

            if (!medicalPackage) {
                createError(404, 'Medical package not found.');
            }

            const arrayServices = medicalPackage.services.sort((a, b) => {
                return b.servicesID.length - a.servicesID.length;
            });

            const services = await ServiceModel
                .find({
                    _id: { $in: arrayServices[0].servicesID },
                    isDeleted: false,
                }, {
                    _id: 1, name: 1
                });

            const formattedMedicalPackage = {
                ...medicalPackage,
                allServices: services
            };

            formattedMedicalPackage.specialty = {
                _id: formattedMedicalPackage.specialtyID._id,
                name: formattedMedicalPackage.specialtyID.name
            };
            delete formattedMedicalPackage.specialtyID;

            return res.status(200).json({
                message: 'Medical package retrieved successfully.',
                data: formattedMedicalPackage,
            });
        } catch (error) {
            next(error);
        }
    },
};