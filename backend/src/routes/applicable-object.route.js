const express = require('express');

const router = express.Router();

const applicableObjectController = require('../controllers/applicable-object.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/applicable-objects':
 *  get:
 *    tags:
 *    - Applicable object Routes
 *    summary: Get all applicable objects
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
    applicableObjectController.getAllApplicableObjects
);

/**
 * @openapi
 * '/api/v1/applicable-objects/{id}':
 *  get:
 *    tags:
 *    - Applicable object Routes
 *    summary: Get applicable object by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Medical package id
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
    applicableObjectController.getApplicableObjectById
);

module.exports = router;