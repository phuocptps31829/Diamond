const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/notifications/get-by-user':
 *  get:
 *    tags:
 *    - Notification Routes
 *    summary: Get notification by user id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Notification id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/get-by-user',
    authMiddleware.verifyAccessToken,
    // helperMiddleware.checkValidId,
    notificationController.getByUserID
);

module.exports = router;