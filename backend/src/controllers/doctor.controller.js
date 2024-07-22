const DoctorModel = require('../models/doctor.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllDoctors = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await DoctorModel.countDocuments();

        const doctors = await DoctorModel
            .find()
        // .skip(skip)
        // .limit(limitDocuments)
        // .sort(sortOptions);
        if (!doctors.length) {
            createError(404, 'No doctor found.');
        }

        // const resDoctor = doctor.map(item => {
        //     const { __v, isDeleted, ...data } = item._doc;
        //     return data;
        // });

        return res.status(200).json({
            page: page || 1,
            message: 'Doctor retrieved successfully.',
            data: doctors,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getAllDoctors,

};