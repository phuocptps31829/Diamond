const { isValidObjectId } = require("mongoose");
const { createError } = require("./helper.util");

const checkIsExistID = async (model, id) => {
    if (!id) {
        createError(400, `${model.modelName} ID is required`);
    }

    if (!isValidObjectId(id)) {
        createError(400, `${model.modelName} ID is not valid`);
    }

    const existedData = await model.findOne({ _id: id });

    if (!existedData) {
        createError(404, `${model.modelName} ID not found`);
    }

    return id;
};

module.exports = {
    checkIsExistID
};