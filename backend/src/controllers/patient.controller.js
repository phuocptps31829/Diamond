const Patient = require('../models/patient.model');
const { createError, errorValidator } = require("../utils/helper.util");

const getAllPatients = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await Patient.countDocuments().populate({
            path: 'userID',
            match: { isDeleted: false }
        });

        const patients = await Patient
            .find().populate({
                path: 'userID',
                match: { isDeleted: false }
            })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);
        if (!patients.length) {
            createError(404, 'No patient found.');
        }
        return res.status(200).json({
            page: page || 1,
            message: 'Patient retrieved successfully.',
            data: patients,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};
const getPatientById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const Patients = await Patient.findById(id).populate({
            path: 'userID'
        });

        if (!Patients) {
            createError(404, 'News not found.');
        }
        return res.status(200).json({
            message: 'News retrieved successfully.',
            data: Patients
        });
    } catch (error) {
        next(error);
    }
};

const createPatient = async (req, res, next) => {
    try {
        const userID = req.newUser._id;
        const newPatient = await Patient.create({ userID, ...req.body });
        newPatient.userID = req.newUser;

        return res.status(201).json({
            message: 'Patient created successfully.',
            data: newPatient
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPatients,
    createPatient,
    getPatientById,
};