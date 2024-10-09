const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @openapi
 * '/api/v1/auth/get-user-by-token':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get user by token
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/get-user-by-token',
    authMiddleware.verifyAccessToken,
    authController.getUserByToken
);

module.exports = router;