const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const clinicController = require('../controllers/clinic.controller');

/**
 * @openapi
 * '/api/v1/clinics':
 *  get:
 *    tags:
 *    - Clinic Routes
 *    summary: Get all clinics
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
    clinicController.getAllClinics
);

/**
 * @openapi
 * '/api/v1/clinics/get-by-specialty-and-branch':
 *  get:
 *    tags:
 *    - Clinic Routes
 *    summary: Get clinics by specialty and branch
 *    parameters:
 *      - in: query
 *        name: branchID
 *        schema:
 *          type: string
 *      - in: query
 *        name: specialtyID
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
    '/get-by-specialty-and-branch',
    clinicController.getClinicsBySpecialtyAndBranch
);

/**
 * @openapi
 * '/api/v1/clinics/{id}':
 *  get:
 *    tags:
 *    - Clinic Routes
 *    summary: Get clinic by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Clinic id
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
    clinicController.getClinicByID
);

module.exports = router;