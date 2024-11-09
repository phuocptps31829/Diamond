const RoleModel = require('../models/role.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllRoles: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions
            } = req.customQueries;

            const totalRecords = await RoleModel.countDocuments({
                isDeleted: false,
            });
            const roles = await RoleModel
                .find({ isDeleted: false })
                .limit(limitDocuments)
                .skip(skip)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!roles.length) {
                createError(404, 'No roles found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Roles retrieved successfully.',
                data: roles,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getRoleById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const role = await RoleModel.findById(id);

            if (!role) {
                createError(404, 'Role not found.');
            }

            return res.status(200).json({
                message: 'Role retrieved successfully.',
                data: role
            });
        } catch (error) {
            next(error);
        }
    }
};