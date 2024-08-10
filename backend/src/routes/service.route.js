const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const serviceValidator = require('../validations/service.validation');

/**
 * @openapi
 * '/api/v1/services':
 *  get:
 *    tags:
 *    - Service Routes
 *    summary: Get all services
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
    serviceController.getAllServices
);

/**
 * @openapi
 * '/api/v1/services/{id}':
 *  get:
 *    tags:
 *    - Service Routes
 *    summary: Get service by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Service id
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
    serviceController.getServiceById
);

/**
 * @openapi
 * '/api/v1/services/add':
 *  post:
 *    tags:
 *    - Service Routes
 *    summary: Add a new service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - name
 *              - images
 *              - price
 *              - discountPrice
 *              - shortDescription
 *              - details
 *            properties:
 *              specialtyID:
 *                type: string
 *              name:
 *                type: string
 *              images:
 *                type: string
 *              price:
 *                type: number
 *              discountPrice:
 *                type: number
 *              shortDescription:
 *                type: string
 *              details:
 *                type: string
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
    serviceValidator.serviceValidator,
    serviceController.createService
);

/**
 * @openapi
 * '/api/v1/services/update/{id}':
 *  put:
 *    tags:
 *    - Service Routes
 *    summary: Update service by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Service id
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - specialtyID
 *              - name
 *              - images
 *              - price
 *              - discountPrice
 *              - shortDescription
 *              - details
 *            properties:
 *              specialtyID:
 *                type: string
 *              name:
 *                type: string
 *              images:
 *                type: string
 *              price:
 *                type: number
 *              discountPrice:
 *                type: number
 *              shortDescription:
 *                type: string
 *              details:
 *                type: string
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
    serviceValidator.serviceValidator,
    serviceController.createService
);

/**
 * @openapi
 * '/api/v1/services/delete/{id}':
 *  delete:
 *    tags:
 *    - Service Routes
 *    summary: Delete service by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the service to delete
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
    serviceController.deleteService
);

module.exports = router;