const express = require('express');

const router = express.Router();

const clinicCapacityController = require('../controllers/clinic-capacity.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const clinicCapacityValidator = require('../validations/clinic-capacity.validation');

/**
 * @openapi
 * '/api/v1/clinic-capacity/':
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
    clinicCapacityController.getAllclinicCapacity
);


/**
 * @openapi
 * '/api/v1/clinic-capacity/doctor/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get clinicCapacity by id
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
    clinicCapacityController.getAllclinicCapacityWithDoctor
);

/**
 * @openapi
 * '/api/v1/clinic-capacity/{id}':
 *  get:
 *    tags:
 *    - Work schedule Routes
 *    summary: Get clinicCapacity by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: clinicCapacity id
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
    clinicCapacityController.getclinicCapacityById
);

/**
 * @openapi
 * '/api/v1/clinic-capacity/add':
 *  post:
 *    tags:
 *    - Work schedule Routes
 *    summary: Add a new clinicCapacity
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
    clinicCapacityValidator.clinicCapacityValidator,
    clinicCapacityController.createClinicCapacity
);

/**
 * @openapi
 * '/api/v1/clinic-capacity/update/{id}':
 *  put:
 *    tags:
 *    - Work schedule Routes
 *    summary: Update clinicCapacity by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: clinicCapacity id
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
    clinicCapacityValidator.clinicCapacityValidator,
    clinicCapacityController.updateClinicCapacity
);

/**
 * @openapi
 * '/api/v1/clinic-capacitys/delete/{id}':
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
    clinicCapacityController.deleteClinicCapacity
);

module.exports = router;