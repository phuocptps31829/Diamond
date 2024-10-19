const express = require('express');

const router = express.Router();

const workScheduleController = require('../controllers/work-schedule.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/work-schedules/':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get all work schedules
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
    workScheduleController.getAllWorkSchedules
);

/**
 * @openapi
 * '/api/v1/work-schedules/get-by-date':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get Work schedule by id
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
 *        name: date
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
    '/get-by-date',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    workScheduleController.getAllWorkScheduleOfDoctor
);


/**
 * @openapi
 * '/api/v1/work-schedules/get-by-doctor-id/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get Work schedule by doctor id
 *    parameters:
 *      - in: path
 *        name: id
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
    '/get-by-doctor-id/:id',
    helperMiddleware.checkValidId,
    workScheduleController.getWorkScheduleByDoctorId
);

/**
 * @openapi
 * '/api/v1/work-schedules/doctor':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get Work schedule by id
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
 *      - in: query
 *        name: doctorID
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
    '/doctor',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    workScheduleController.getAllWorkScheduleWithDoctor
);

/**
 * @openapi
 * '/api/v1/work-schedules/detail/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get Work schedule by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: detail id
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
    '/detail/:id',
    helperMiddleware.checkValidId,
    workScheduleController.getWorkScheduleByDetailId
);


/**
 * @openapi
 * '/api/v1/work-schedules/branch':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get Work schedule by branch id
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
 *      - in: query
 *        name: countAppointments
 *        schema:
 *          type: number
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
    '/branch',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    workScheduleController.getAllWorkScheduleWithBranch
);

/**
 * @openapi
 * '/api/v1/work-schedules/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get workSchedule by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: workSchedule id
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
    workScheduleController.getWorkScheduleById
);

module.exports = router;