const RoleModel = require('../models/role.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllRoles: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions,
                search
            } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const totalRecords = await RoleModel.countDocuments({
                ...(search ? {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                } : {})
            });
            const roles = await RoleModel
                .find({
                    ...(search ? {
                        name: {
                            $regex: search,
                            $options: 'i'
                        }
                    } : {})
                })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

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