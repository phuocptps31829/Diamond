const { default: mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: Number,
        trim: true,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    redirect: {
        endpoint: {
            type: String,
            trim: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
}, {
    collection: 'Notification',
    timestamps: true
}
);

module.exports = mongoose.model('Notification', notificationSchema);