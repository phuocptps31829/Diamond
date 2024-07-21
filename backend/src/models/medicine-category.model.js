const { default: mongoose } = require("mongoose");

const medicineCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('MedicineCategory', medicineCategorySchema);