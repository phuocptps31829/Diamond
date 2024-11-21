const express = require('express');

const router = express.Router();

const specialtyController = require('../controllers/specialty.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/specialties':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get all specialties
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
    specialtyController.getAllSpecialties
);

/**
 * @openapi
 * '/api/v1/specialties/specialties-with-services':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get all specialties with services
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
*/
router.get(
    '/specialties-with-services',
    specialtyController.getAllSpecialtiesWithServices
);

/**
 * @openapi
 * '/api/v1/specialties/{id}':
 *  get:
 *    tags:
 *    - Specialty Routes
 *    summary: Get specialty by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Specialty id
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
    specialtyController.getSpecialtyById
);

module.exports = router;