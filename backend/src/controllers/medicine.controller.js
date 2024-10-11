const MedicineModel = require('../models/medicine.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllMedicines: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await MedicineModel.countDocuments({
                isDeleted: false,
            });

            const medicines = await MedicineModel
                .find({ isDeleted: false })
                .populate('medicineCategoryID')
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!medicines.length) {
                createError(404, 'No medicines found.');
            }

            const formattedMedicines = medicines.map((medicine) => {
                const newMedicine = { ...medicine.toObject() };
                newMedicine.medicineCategory = {
                    _id: newMedicine.medicineCategoryID._id,
                    name: newMedicine.medicineCategoryID.name,
                };
                delete newMedicine.medicineCategoryID;
                return newMedicine;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Medicines retrieved successfully.',
                data: formattedMedicines,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getMedicineById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const medicine = await MedicineModel
                .findOne({
                    _id: id,
                    isDeleted: false,
                })
                .populate('medicineCategoryID');

            if (!medicine) {
                createError(404, 'Medical package not found.');
            }

            const newMedicine = { ...medicine.toObject() };
            newMedicine.medicineCategory = {
                _id: newMedicine.medicineCategoryID._id,
                name: newMedicine.medicineCategoryID.name,
            };
            delete newMedicine.medicineCategoryID;

            return res.status(200).json({
                message: 'Medical package retrieved successfully.',
                data: newMedicine,
            });
        } catch (error) {
            next(error);
        }
    }
};