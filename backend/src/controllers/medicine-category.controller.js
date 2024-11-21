const MedicineCategoryModel = require('../models/medicine-category.model');
const MedicineModel = require('../models/medicine.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllMedicineCategories: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await MedicineCategoryModel.countDocuments({ isDeleted: false });
            let noPaginated = req.query?.noPaginated === 'true';

            const medicineCategories = await MedicineCategoryModel
                .find({ isDeleted: false })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!medicineCategories.length) {
                createError(404, 'No medicine categories found.');
            }

            const medicineCategoriesWithCount = await Promise.all(
                medicineCategories.map(async (m) => {
                    const totalMedicines = await MedicineModel.countDocuments({ isDeleted: false, medicineCategoryID: m._id });
                    return {
                        ...m.toObject(),
                        totalMedicines,
                    };
                })
            );

            return res.status(200).json({
                page: page || 1,
                message: 'Medicine categories retrieved successfully.',
                data: medicineCategoriesWithCount,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getMedicineCategoryById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const MedicineCategory = await MedicineCategoryModel.findById(id);

            if (!MedicineCategory) {
                createError(404, 'Medicine category not found.');
            }

            return res.status(200).json({
                message: 'Medicine category retrieved successfully.',
                data: MedicineCategory
            });
        } catch (error) {
            next(error);
        }
    }
};