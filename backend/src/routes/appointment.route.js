const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');
const appointmentController = require('../controllers/appointment.controller');

/**
 * @openapi
 * '/api/v1/appointments':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments
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
 *      - in: query
 *        name: startDay
 *        schema:
 *          type: string
 *      - in: query
 *        name: endDay
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
    // cacheMiddleware.cache("appointments:"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointments
);

/**
 * @openapi
 * '/api/v1/appointments/specialty':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments for specialty
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/specialty',
    cacheMiddleware.cache("appointments:specialty-"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForSpecialty
);

/**
 * @openapi
 * '/api/v1/appointments/gender-years':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments for gender years
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/gender-years',
    // cacheMiddleware.cache("appointments:gender-years-"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForGenderYears
);

/**
 * @openapi
 * '/api/v1/appointments/ages-dashboard':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments for ages dashboard
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/ages-dashboard',
    // cacheMiddleware.cache("appointments:ages-dashboard-"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForAges
);

/**
 * @openapi
 * '/api/v1/appointments/get-by-patient':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments by patient
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
 *      - in: query
 *        name: startDay
 *        schema:
 *          type: string
 *      - in: query
 *        name: endDay
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
    '/get-by-patient',
    authMiddleware.verifyAccessToken,
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsOfPatient
);

/**
 * @openapi
 * '/api/v1/appointments/get-by-doctor':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments by doctor 
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
 *      - in: query
 *        name: startDay
 *        schema:
 *          type: string
 *      - in: query
 *        name: endDay
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
    '/get-by-doctor',
    authMiddleware.verifyAccessToken,
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsOfDoctor
);
/**
 * @openapi
 * '/api/v1/appointments/{id}':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get appointment by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Appointment id
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
    appointmentController.getAppointmentByID
);

module.exports = router;