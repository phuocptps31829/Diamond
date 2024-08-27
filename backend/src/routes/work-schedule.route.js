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
 *      - in: query
 *        name: gender
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *      - in: query
 *        name: branchID
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *        explode: true
 *      - in: query
 *        name: specialtyID
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *        explode: true
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
 * '/api/v1/work-schedules/doctor/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get WorkSchedule by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Doctor id
 *        schema:
 *          type: string
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
 *        name: gender
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/doctor/:id',
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    workScheduleController.getAllWorkScheduleWithDoctor
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
 *              - details
 *            properties:
 *              doctorID:
 *                type: string
 *              day:
 *                type: string
 *              details:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties: 
 *                    clinicID: 
 *                      type: string
 *                    hour: 
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
 *              - details
 *            properties:
 *              doctorID:
 *                type: string
 *              day:
 *                type: string
 *              details:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties: 
 *                    clinicID: 
 *                      type: string
 *                    hour: 
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