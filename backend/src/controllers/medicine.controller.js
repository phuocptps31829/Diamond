const MedicineModel = require('../models/medicine.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllMedicines: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions, search } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const medicines = await MedicineModel
                .find({})
                .populate('medicineCategoryID')
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            let formattedMedicines = medicines.map((medicine) => {
                const newMedicine = { ...medicine.toObject() };
                newMedicine.medicineCategory = {
                    _id: newMedicine.medicineCategoryID._id,
                    name: newMedicine.medicineCategoryID.name,
                };
                delete newMedicine.medicineCategoryID;
                return newMedicine;
            });

            if (search) {
                formattedMedicines = formattedMedicines.filter(medicine => {
                    return medicine.name.toLowerCase().includes(search.toLowerCase()) ||
                        medicine.medicineCategory.name.toLowerCase().includes(search.toLowerCase());
                });
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Medicines retrieved successfully.',
                data: noPaginated ? formattedMedicines : formattedMedicines.slice(skip, skip + limitDocuments),
                totalRecords: formattedMedicines.length
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
    },
    getMedicineByCategoryID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const totalRecords = await MedicineModel.countDocuments({
                medicineCategoryID: id,

            });

            const medicines = await MedicineModel
                .find({
                    medicineCategoryID: id,

                })
                .populate('medicineCategoryID');

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
                message: 'Medicines retrieved successfully.',
                data: formattedMedicines,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    }
};