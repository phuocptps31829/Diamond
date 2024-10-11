const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const hospitalController = require('../controllers/hospital.controller');

/**
 * @openapi
 * '/api/v1/hospitals':
 *  get:
 *    tags:
 *    - Hospital Routes
 *    summary: Get all hospital
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
    hospitalController.getAllHospitals
);

/**
 * @openapi
 * '/api/v1/hospitals/{id}':
 *  get:
 *    tags:
 *    - Hospital Routes
 *    summary: Get hospital by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Hospital id
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
    hospitalController.getHospitalByID
);

module.exports = router;