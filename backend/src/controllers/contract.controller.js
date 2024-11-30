const ContractModel = require('../models/contract.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllContracts: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await ContractModel.countDocuments({});
            let noPaginated = req.query?.noPaginated === 'true';

            const contracts = await ContractModel
                .find({

                })
                .populate('doctorID', '_id fullName')
                .populate('hospitalID', '_id name')
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                })
                .lean();

            if (!contracts.length) {
                createError(404, "No contracts found.");
            }

            const formattedContracts = contracts.map(contract => {
                const formattedContract = {
                    ...contract,
                    doctor: contract.doctorID,
                    hospital: contract.hospitalID
                };

                delete formattedContract.doctorID;
                delete formattedContract.hospitalID;

                return formattedContract;
            });


            return res.status(200).json({
                page: page || 1,
                message: 'Contracts retrieved successfully.',
                data: formattedContracts,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getContractByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const contract = await ContractModel
                .findOne({

                    _id: id
                })
                .populate('doctorID', '_id fullName')
                .populate('hospitalID', '_id name')
                .lean();

            if (!contract) {
                createError(404, "Contract not found.");
            }

            const formattedContract = {
                ...contract,
                doctor: contract.doctorID,
                hospital: contract.hospitalID
            };
            delete formattedContract.doctorID;
            delete formattedContract.hospitalID;

            return res.status(200).json({
                message: 'Contract retrieved successfully.',
                data: formattedContract,
            });
        } catch (error) {
            next(error);
        }
    },
};