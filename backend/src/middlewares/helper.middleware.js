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

module.exports = {
    checkValidId
};