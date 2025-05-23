const BranchModel = require('../models/branch.model');
const { createError } = require("../utils/helper.util");
const mongoose = require("mongoose");

module.exports = {
    getAllBranches: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions, search } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const searchQuery = search ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ]
            } : {};

            const totalRecords = await BranchModel.countDocuments({
                ...searchQuery
            });

            const branches = await BranchModel
                .find({
                    ...searchQuery
                })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            return res.status(200).json({
                page: page || 1,
                message: 'Branches retrieved successfully.',
                data: branches,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getBranchByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const branch = await BranchModel.findOne({

                _id: id
            });

            if (!branch) {
                createError(404, "Branch not found.");
            }

            return res.status(200).json({
                message: 'Branch retrieved successfully.',
                data: branch,
            });
        } catch (error) {
            next(error);
        }
    },
    getBranchBySpecialtyID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const pipeline = [
                {
                    $lookup: {
                        from: 'Clinic',
                        localField: '_id',
                        foreignField: 'branchID',
                        as: 'clinics'
                    }
                },
                {
                    $match: {
                        'clinics.specialtyID': new mongoose.Types.ObjectId(id)
                    }
                }
            ];

            const branches = await BranchModel.aggregate(pipeline);

            if (!branches) {
                createError(404, "No branches found.");
            }

            return res.status(200).json({
                message: 'Branches retrieved successfully.',
                data: branches,
            });
        } catch (error) {
            next(error);
        }
    },
};