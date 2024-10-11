const ContractModel = require('../models/contract.model');
const { createError } = require('../utils/helper.util');


module.exports = {
    getAllContracts: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await ContractModel.countDocuments({ isDeleted: false });

            const contracts = await ContractModel
                .find({ isDeleted: false })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!contracts.length) {
                createError(404, "No contracts found.");
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Contracts retrieved successfully.',
                data: contracts,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getContractByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const contract = await ContractModel.findOne({
                isDeleted: false,
                _id: id
            });

            if (!contract) {
                createError(404, "Contract not found.");
            }

            return res.status(200).json({
                message: 'Contract retrieved successfully.',
                data: contract,
            });
        } catch (error) {
            next(error);
        }
    },
};