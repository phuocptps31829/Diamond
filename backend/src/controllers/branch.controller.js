const BranchModel = require('../models/branch.model');
const { createError } = require("../utils/helper.util");
const mongoose = require("mongoose");

module.exports = {
    getAllBranches: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await BranchModel.countDocuments({ isDeleted: false });

            const branches = await BranchModel
                .find({ isDeleted: false })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!branches.length) {
                createError(404, "No branches found.");
            }

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
                isDeleted: false,
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

            const branch = await BranchModel.aggregate(pipeline);


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
};