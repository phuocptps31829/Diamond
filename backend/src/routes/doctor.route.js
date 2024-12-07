const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctor.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');

/**
 * @openapi
 * '/api/v1/doctors':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get all doctors
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
    cacheMiddleware.cache("Doctor:"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    doctorController.getAllDoctors
);

/**
 * @openapi
 * '/api/v1/doctors/get-by-branch-and-specialty':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get user by token
 *    parameters:
 *      - in: query
 *        name: specialtyID
 *        schema:
 *          type: string
 *      - in: query
 *        name: branchID
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
    '/get-by-branch-and-specialty',
    doctorController.getDoctorBySpecialtyAndBranch
);

/**
 * @openapi
 * '/api/v1/doctors/by-available-time':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get user by token
 *    parameters:
 *      - in: query
 *        name: specialtyID
 *        schema:
 *          type: string
 *      - in: query
 *        name: branchID
 *        schema:
 *          type: string
 *      - in: query
 *        name: day
 *        schema:
 *          type: string
 *      - in: hour
 *        name: day
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
    '/by-available-time',
    doctorController.getAvailableDoctorsByDayHour
);

/**
 * @openapi
 * '/api/v1/doctors/{id}':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get doctor by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Doctor id
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
    doctorController.getDoctorByID
);


module.exports = router;