const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');

/**
 * @openapi
 * '/api/v1/services':
 *  get:
 *    tags:
 *    - Service Routes
 *    summary: Get all services
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
    cacheMiddleware.cache("Service:"),
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    serviceController.getAllServices
);


/**
 * @openapi
 * '/api/v1/services/slug/{slug}':
 *  get:
 *    tags:
 *    - Service Routes
 *    summary: Get service by slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *        description: Service slug
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
    '/slug/:slug',
    serviceController.getServiceBySlug
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
 * '/api/v1/services/specialty/{id}':
 *  get:
 *    tags:
 *    - Service Routes
 *    summary: Get service by specialty id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Service id
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
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/specialty/:id',
    helperMiddleware.checkValidId,
    helperMiddleware.checkQueryParams,
    serviceController.getAllServicesBySpecialtyId
);

module.exports = router;