const MedicalPackageModel = require('../models/medical-package.model');
const ServiceModel = require('../models/service.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllMedicalPackages: async (req, res, next) => {
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
                ...(search ? { slug: { $regex: search, $options: 'i' } } : {})
            };

            const totalRecords = await MedicalPackageModel
                .countDocuments({

                    ...(notHidden ? { isHidden: false } : {}),
                    ...queryOptions
                });

            const medicalPackages = await MedicalPackageModel
                .find({

                    ...(notHidden ? { isHidden: false } : {}),
                    ...queryOptions
                })
                .populate('specialtyID')
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                })
                .lean();

            const formattedMedicalPackages = medicalPackages.map(package => {
                const formattedPackage = {
                    ...package,
                    specialty: {
                        _id: package.specialtyID._id,
                        name: package.specialtyID.name,
                    }
                };

                delete formattedPackage.specialtyID;
                return formattedPackage;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'MedicalPackages retrieved successfully.',
                data: formattedMedicalPackages?.length
                    ? formattedMedicalPackages
                    : [],
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

                specialtyID: id,
            });
            const medicalPackages = await MedicalPackageModel
                .find({

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