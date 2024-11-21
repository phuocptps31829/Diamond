const UserModel = require('../models/user.model');
const SpecialtyModel = require('../models/specialty.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getUserByToken: async (req, res, next) => {
        try {
            const idParams = req.params?.id;
            const idMid = req.user?.id;

            const user = await UserModel
                .findOne({ isDeleted: false, _id: idParams || idMid })
                .populate('roleID')
                .lean();

            if (!user) {
                createError(404, 'User not found.');
            }

            user.role = {
                _id: user.roleID._id,
                name: user.roleID.name
            };
            delete user.roleID;

            if (user.role._id === process.env.ROLE_DOCTOR) {
                const specialty = await SpecialtyModel.findById(user.otherInfo.specialtyID);
                user.otherInfo.specialty = {
                    _id: specialty._id,
                    name: specialty.name
                };
                delete user.otherInfo.specialtyID;
            }

            if (user.role._id.toString() === process.env.ROLE_PATIENT) {
                let relatedPatients = [];
                if (user.otherInfo?.relatedPatientsID?.length) {
                    const fetchRelatedPatientsPromises = user.otherInfo.relatedPatientsID.map(async (id) => {
                        const relatedPatient = await UserModel.findById(id);
                        return relatedPatient ? {
                            _id: relatedPatient._id,
                            fullName: relatedPatient.fullName
                        } : null;
                    });

                    relatedPatients = await Promise.all(fetchRelatedPatientsPromises);
                    relatedPatients = relatedPatients.filter(Boolean);
                }
                user.otherInfo.relatedPatients = relatedPatients;
                delete user.otherInfo?.relatedPatientsID;
            }

            return res.status(200).json({
                message: 'User retrieved successfully.',
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },
};