const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const helperMiddleware = require('../middlewares/helper.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');

/**
 * @openapi
 * '/api/v1/patients':
 *  get:
 *    tags:
 *    - Patient Routes
 *    summary: Get all patients
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
    authMiddleware.verifyAdmin,
    cacheMiddleware.cache("Patient:"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    patientController.getAllPatients
);

/**
 * @openapi
 * '/api/v1/patients/related-patient/{id}':
 *  get:
 *    tags:
 *    - Patient Routes
 *    summary: Get related patient by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Patient id
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
    '/related-patient/:id',
    authMiddleware.verifyAccessToken,
    helperMiddleware.checkValidId,
    patientController.getPatientByID
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
 *        description: Patient id
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
    patientController.getPatientByID
);

module.exports = router;