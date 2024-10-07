const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patient.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

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
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    patientController.getAllPatients
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

// /**
//  * @openapi
//  * '/api/v1/users/get-by-token':
//  *  get:
//  *    tags:
//  *    - User Routes
//  *    summary: Get user by token
//  *    responses:
//  *      '200':
//  *        $ref: '#/components/responses/200'
//  *      '404':
//  *        $ref: '#/components/responses/404'
//  *      '500':
//  *        $ref: '#/components/responses/500'
// */
// router.get(
//     '/get-by-token',
//     authMiddleware.verifyAccessToken,
//     patientController.getUserByID
// );

module.exports = router;