const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
// const uploadMiddleware = require('../middlewares/upload.middleware');
const patientController = require('../controllers/patient.controller');
const patientValidator = require('../validations/patient.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/patients':
 *  get:
 *    tags:
 *    - patient Routes
 *    summary: Get all patient (?page=1&limit=10&sort=1)
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
 * '/api/v1/patients/{id}':
 *  get:
 *    tags:
 *    - patient Routes
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
 *    summary: Add a new patient
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - dateOfBirth
 *              - address
 *              - gender
 *              - password
 *              - avatar
 *              - citizenIdentificationNumber
 *              - specialtyID
 *              - isActivated
 *              - title
 *              - practicingCertificate
 *              - yearsExperience
 *              - detail
 *              - isInternal
 *            properties:
 *              fullName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              email:
 *                type: string
 *              dateOfBirth:
 *                type: string
 *              gender:
 *                type: string
 *              address:
 *                type: object
 *                required:
 *                  - province
 *                  - district
 *                  - ward
 *                  - street
 *                properties:
 *                  province:
 *                    type: string
 *                  district:
 *                    type: string
 *                  ward:
 *                    type: string
 *                  street:
 *                    type: string
 *              password:
 *                type: string
 *              avatar:
 *                type: string
 *              citizenIdentificationNumber:
 *                type: number
 *              isActivated:
 *                type: boolean
 *              specialtyID:
 *                type: string
 *              title:
 *                type: string
 *              practicingCertificate:
 *                type: string
 *              yearsExperience:
 *                type: number
 *              detail:
 *                type: string
 *              isInternal:
 *                type: boolean
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
    patientValidator.patientValidator,
    userController.createUser,
    patientController.createPatient
);

module.exports = router;