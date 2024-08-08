const express = require('express');
const router = express.Router();
// const passport = require('passport');

const userValidator = require('../validations/user.validation');
const authController = require('../controllers/auth.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get(
//     '/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get(
//     '/facebook',
//     passport.authenticate('facebook', { scope: ['email'] })
// );

// router.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     authController.googleCallback
// );

// router.get(
//     '/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/' }),
//     authController.facebookCallback
// );

/**
 * @openapi
 * '/api/v1/auth/register':
 *  post:
 *    tags:
 *    - Auth Routes
 *    summary: Register patient
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - phoneNumber
 *              - password
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/register',
    userValidator.userValidator,
    authController.createOTP
);

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth Routes
 *     summary: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@gmail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/login',
    authController.login
);

// router.put(
//     '/forgot-password/:email',
//     authController.forgotPassword
// );

router.post(
    '/refresh-token',
    authController.refreshToken
);

router.post(
    '/logout',
    authMiddleware.verifyToken,
    authController.logout
);


module.exports = router;