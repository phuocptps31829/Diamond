const NotificationModel = require('../models/notification.model');

module.exports = {
    getByUserID: async (req, res, next) => {
        try {
            const id = req?.user?.id;
            const notifications = await NotificationModel
                .find({ userID: id })
                .sort({ createdAt: -1 })
                .lean();

            return res.status(200).json({
                message: 'Notifications retrieved successfully.',
                data: notifications,
            });
        } catch (error) {
            next(error);
        }
    },
};