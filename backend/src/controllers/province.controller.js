const mongoose = require('mongoose');
const { createError } = require('../utils/helper.util');

const ProvinceSchema = new mongoose.Schema({}, { strict: false });

const ProvinceModel = mongoose.model('Province', ProvinceSchema, 'Province');

const getAllProvinces = async (req, res, next) => {
    try {
        const totalRecords = await ProvinceModel.countDocuments({});
        const provinces = await ProvinceModel
            .find({}, 'name');

        if (!provinces.length) {
            createError(404, "No provinces found.");
        }

        return res.status(200).json({
            page: 1,
            message: 'Provinces retrieved successfully.',
            data: provinces,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getDistrictsByProvinceId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const districts = await ProvinceModel
            .find({ _id: id }, 'districts.name districts._id')
            .lean();

        if (!districts.length) {
            createError(404, "No districts found.");
        }

        return res.status(200).json({
            page: 1,
            message: 'Districts retrieved successfully.',
            data: districts[0].districts,
            totalRecords: districts.length
        });
    } catch (error) {
        next(error);
    }
};

const getWardsByDistrictId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const wards = await ProvinceModel
            .aggregate([
                {
                    "$unwind": "$districts"
                },
                {
                    "$match": {
                        "districts._id": new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    "$unwind": "$districts.wards"
                },
                {
                    "$project": {
                        "wards": "$districts.wards"
                    }
                }
            ]);

        if (!wards.length) {
            createError(404, "No wards found.");
        }

        return res.status(200).json({
            page: 1,
            message: 'Wards retrieved successfully.',
            data: wards,
            totalRecords: wards.length
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProvinces,
    getDistrictsByProvinceId,
    getWardsByDistrictId
};