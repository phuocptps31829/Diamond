const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const appointmentController = require('../controllers/appointment.controller');

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
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForAges
);

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
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointments
);


/**
 * @openapi
 * '/api/v1/appointments/get-appointment':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get Appointment by id
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
 *        name: doctorID
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
    '/get-appointment',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsOfDoctor
);

module.exports = router;