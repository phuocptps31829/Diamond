const NotificationModel = require('../models/notification.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getByUserID: async (req, res, next) => {
        try {
            const id = req?.user?.id;
            console.log('id', req.user);
            const notifications = await NotificationModel
                .find({ userID: id })
                .sort({ time: -1 })
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