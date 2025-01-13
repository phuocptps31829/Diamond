const UserModel = require('../models/user.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllPatients: async (req, res, next) => {
        try {
            const {
                limitDocuments,
                page,
                skip,
                sortOptions,
                search
            } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const patients = await UserModel
                .find({ roleID: process.env.ROLE_PATIENT })
                .populate('roleID')
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            let transformedPatients = patients.map(patient => {
                const patientObject = patient.toObject();
                patientObject.role = {
                    _id: patient.roleID._id,
                    name: patient.roleID.name
                };
                delete patientObject.roleID;
                return patientObject;
            });

            const relatedPatientsPromises = transformedPatients.map(async (patient) => {
                let relatedPatients = [];
                if (patient.otherInfo?.relatedPatientsID?.length) {
                    const fetchRelatedPatientsPromises = patient.otherInfo.relatedPatientsID.map(async (id) => {
                        const relatedPatient = await UserModel.findById(id);
                        return relatedPatient ? {
                            _id: relatedPatient._id,
                            name: relatedPatient.fullName
                        } : null;
                    });

                    relatedPatients = await Promise.all(fetchRelatedPatientsPromises);
                    relatedPatients = relatedPatients.filter(Boolean);
                }
                if (!patient?.otherInfo) {
                    patient.otherInfo = {};
                }
                patient.otherInfo.relatedPatients = relatedPatients;
                delete patient.otherInfo?.relatedPatientsID;
                return patient;
            });

            transformedPatients = await Promise.all(relatedPatientsPromises);

            if (search) {
                transformedPatients = transformedPatients.filter(patient => {
                    return patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        patient?.email?.toLowerCase().includes(search.toLowerCase()) ||
                        patient?.phone?.toLowerCase().includes(search.toLowerCase());
                });
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Patients retrieved successfully.',
                data: noPaginated ? transformedPatients : transformedPatients.slice(skip, skip + limitDocuments),
                totalRecords: transformedPatients.length
            });
        } catch (error) {
            next(error);
        }
    },
    getPatientByID: async (req, res, next) => {
        try {
            const idParams = req.params?.id;
            const idMid = req.user?.id;

            const patient = await UserModel
                .findOne({
                    _id: idParams || idMid,

                    roleID: process.env.ROLE_PATIENT
                })
                .populate('roleID')
                .lean();

            if (!patient) {
                createError(404, 'Patient not found.');
            }

            const transformedPatient = patient;
            transformedPatient.role = {
                _id: transformedPatient.roleID._id,
                name: transformedPatient.roleID.name
            };
            delete transformedPatient.roleID;

            if (patient.otherInfo?.relatedPatientsID?.length) {
                const fetchRelatedPatientsPromises = patient.otherInfo.relatedPatientsID.map(async (id) => {
                    const relatedPatient = await UserModel.findById(id);
                    return relatedPatient ? {
                        _id: relatedPatient._id,
                        fullName: relatedPatient.fullName
                    } : null;
                });

                relatedPatients = await Promise.all(fetchRelatedPatientsPromises);
                relatedPatients = relatedPatients.filter(Boolean);
                patient.otherInfo.relatedPatients = relatedPatients;
                delete patient.otherInfo?.relatedPatientsID;
            }

            return res.status(200).json({
                message: 'Patient retrieved successfully.',
                data: transformedPatient,
            });
        } catch (error) {
            next(error);
        }
    },
};