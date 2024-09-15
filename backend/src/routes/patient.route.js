const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const patientController = require('../controllers/patient.controller');
const patientValidator = require('../validations/patient.validation');
const userValidator = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/patients':
 *  get:
 *    tags:
 *    - Patient Routes
 *    summary: Get all patient (?page=1&limit=10&sort=1)
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sort
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
    '/',
    helperMiddleware.checkQueryParams,
    patientController.getAllPatients
);

/**
 * @openapi
 * '/api/v1/patients/profile':
 *  get:
 *    tags:
 *    - Patient Routes
 *    summary: Get patient by token
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/profile',
    authMiddleware.verifyAccessToken,
    patientController.getPatientById
);

/**
 * @openapi
 * '/api/v1/patients/{id}':
 *  get:
 *    tags:
 *    - Patient Routes
 *    summary: Get patient by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: patient id
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
    '/:id',
    helperMiddleware.checkValidId,
    patientController.getPatientById
);

/**
 * @openapi
 * '/api/v1/patients/add':
 *  post:
 *    tags:
 *    - Patient Routes
 *    summary: Add a new patient via OTP
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - OTP
 *              - otpToken
 *            properties:
 *              OTP:
 *                type: string
 *              otpToken:
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
    '/add',
    authMiddleware.verifyOTP,
    userController.createUser,
    patientValidator.patientValidator,
    patientController.createPatient
);

/**
 * @openapi
 * '/api/v1/patients/add-full-info':
 *  post:
 *    tags:
 *    - Patient Routes
 *    summary: Add a patient with full info
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - phoneNumber
 *              - email
 *              - gender
 *              - dateOfBirth
 *              - address
 *              - citizenIdentificationNumber
 *              - occupation
 *              - ethnic
 *              - password
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              email:
 *                type: string
 *              gender:
 *                type: string
 *              dateOfBirth:
 *                type: string
 *              address:
 *                type: object
 *                properties:
 *                  province:
 *                    type: string
 *                  district:
 *                    type: string
 *                  ward:
 *                    type: string
 *                  street:
 *                    type: string
 *              citizenIdentificationNumber:
 *                type: number
 *              occupation:
 *                type: string
 *              ethnic:
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
    '/add-full-info',
    userValidator.userValidator,
    userController.createUser,
    patientValidator.patientValidator,
    patientController.createPatient
);

module.exports = router;