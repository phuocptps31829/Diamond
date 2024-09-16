const express = require('express');

const router = express.Router();

const workScheduleController = require('../controllers/work-schedule.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const workScheduleValidator = require('../validations/work-schedule.validation');

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
    workScheduleController.getAllWorkSchedule
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

/**
 * @openapi
 * '/api/v1/work-schedules/add':
 *  post:
 *    tags:
 *    - Work schedule Routes
 *    summary: Add a new workSchedule
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - doctorID
 *              - day
 *              - hour
 *            properties:
 *              doctorID:
 *                type: string
 *              day:
 *                type: string
 *              clinicID: 
 *                type: string
 *              hour:
 *                type: object
 *                properties:
 *                  startTime:
 *                    type: string
 *                  endTime:
 *                      type: string
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
    workScheduleValidator.workScheduleValidator,
    workScheduleController.createWorkSchedule
);

/**
 * @openapi
 * '/api/v1/work-schedules/update/{id}':
 *  put:
 *    tags:
 *    - Work schedule Routes
 *    summary: Update workSchedule by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: WorkSchedule id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - doctorID
 *              - day
 *              - hour
 *            properties:
 *              doctorID:
 *                type: string
 *              day:
 *                type: string
 *              clinicID: 
 *                type: string
 *              hour:
 *                type: object
 *                items:          
 *                  type: object
 *                  properties:
 *                    startTime:
 *                      type: string
 *                    endTime:
 *                      type: string
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
router.put(
    '/update/:id',
    helperMiddleware.checkValidId,
    workScheduleValidator.workScheduleValidator,
    workScheduleController.updateWorkSchedule
);

/**
 * @openapi
 * '/api/v1/work-schedules/delete/{id}':
 *  delete:
 *    tags:
 *    - Work schedule Routes
 *    summary: Delete work schedule  by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the work schedule to delete
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
router.delete(
    '/delete/:id',
    helperMiddleware.checkValidId,
    workScheduleController.deleteWorkSchedule
);

module.exports = router;