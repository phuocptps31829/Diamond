const express = require('express');

const router = express.Router();

const provinceController = require('../controllers/province.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/provinces':
 *  get:
 *    tags:
 *    - Provinces Routes
 *    summary: Get all provinces
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
    provinceController.getAllProvinces
);

/**
 * @openapi
 * '/api/v1/provinces/districts/{id}':
 *  get:
 *    tags:
 *    - Provinces Routes
 *    summary: Get districts by province id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Province id
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
    '/districts/:id',
    helperMiddleware.checkValidId,
    provinceController.getDistrictsByProvinceId
);

/**
 * @openapi
 * '/api/v1/provinces/wards/{id}':
 *  get:
 *    tags:
 *    - Provinces Routes
 *    summary: Get ward by district id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Districts id
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
    '/wards/:id',
    helperMiddleware.checkValidId,
    provinceController.getWardsByDistrictId
);

module.exports = router;