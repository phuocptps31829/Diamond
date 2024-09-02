const mongoose = require("mongoose");

const { createError } = require("../utils/helper.util");

const checkValidId = (req, res, next) => {
    const { id } = req.params;

    try {
        if (!id) {
            createError(400, 'ID is required.');
        }

        if (!mongoose.isValidObjectId(id)) {
            createError(400, 'Invalid ID.');
        }

        next();
    } catch (error) {
        next(error);
    }
};
const checkValueQuery = (req, res, next) => {
    try {
        let { doctorID = null, branchID = null, specialtyID = null, gender = null, startDay = null, endDay = null } = req.query;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (startDay) {
            if (!dateRegex.test(startDay)) {
                createError(400, `Invalid start day format. Expected format is YYYY-MM-DD.`);
            }
        }

        if (endDay) {
            if (!dateRegex.test(endDay)) {
                createError(400, `Invalid end day format. Expected format is YYYY-MM-DD.`);
            }
        }

        if (startDay && endDay) {
            const startDate = new Date(startDay);
            const endDate = new Date(endDay);

            if (endDate < startDate) {
                createError(400, `The end day (${endDay}) must be greater than or equal to the start day (${startDay})`);
            }
        }

        if (Array.isArray(gender)) {
            if (gender.includes('Nam') && gender.includes('Nữ')) {
                gender = null;
            } else {
                gender = gender[0];
            }
        }

        if (branchID && !Array.isArray(branchID)) {
            branchID = [branchID];
        }

        if (specialtyID && !Array.isArray(specialtyID)) {
            specialtyID = [specialtyID];
        }

        if (doctorID && !Array.isArray(doctorID)) {
            doctorID = [doctorID];
        }

        if (doctorID) {
            doctorID.forEach(id => {
                if (!mongoose.isValidObjectId(id)) {
                    createError(400, `Invalid doctorID: ${id}`);
                }
            });
        }

        if (branchID) {
            branchID.forEach(id => {
                if (!mongoose.isValidObjectId(id)) {
                    createError(400, `Invalid branchID: ${id}`);
                }
            });
        }

        if (specialtyID) {
            specialtyID.forEach(id => {
                if (!mongoose.isValidObjectId(id)) {
                    createError(400, `Invalid specialtyID: ${id}`);
                }
            });
        }

        req.checkValueQuery = {
            doctorID,
            branchID,
            specialtyID,
            gender,
            startDay,
            endDay,
        };

        next();
    } catch (error) {
        next(error);
    }
};

const checkQueryParams = (req, res, next) => {
    try {
        let { page, limit, sort } = req.query;

        const sortOptions = {};
        let limitDocuments;
        let skip;

        page = Array.isArray(page) ? page[0] : page;
        limit = Array.isArray(limit) ? limit[0] : limit;
        sort = Array.isArray(sort) ? sort[0] : sort;

        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page <= 0) {
            page = 1;
        }

        if (isNaN(limit) || limit <= 0) {
            console.log(true);
            limit = 10;
        }

        limitDocuments = limit;
        skip = (page - 1) * limitDocuments;

        if (sort) {
            if (sort.startsWith('-')) {
                sortOptions[sort.substring(1)] = -1;
            } else {
                sortOptions[sort] = 1;
            }
        }

        req.customQueries = {
            limitDocuments,
            page,
            skip,
            sortOptions
        };

        next();
    } catch (error) {
        next(error);
    }
};

const isCreatePatient = (req, res, next) => {
    try {
        req.isCreateDoctor = false;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkValidId,
    checkValueQuery,
    checkQueryParams,
    isCreatePatient
};