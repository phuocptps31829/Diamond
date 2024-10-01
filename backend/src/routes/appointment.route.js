const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const appointmentController = require('../controllers/appointment.controller');
const appointmentValidator = require('../validations/appointment.validation');

/**
 * @openapi
 * '/api/v1/appointments/specialty':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments for specialty
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
 *        name: time
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
    '/specialty',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForSpecialty
);

/**
 * @openapi
 * '/api/v1/appointments/years':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get all Appointments for years
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
 *        name: time
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
    '/years',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    appointmentController.getAllAppointmentsForYears
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
/**
 * @openapi
 * '/api/v1/appointments/{id}':
 *  get:
 *    tags:
 *    - Appointment Routes
 *    summary: Get Appointment by id
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
    appointmentController.getAppointmentsById
);
module.exports = router;