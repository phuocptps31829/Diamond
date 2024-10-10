const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const medicineCategoryController = require('../controllers/medicine-category.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/medicine-categories':
 *  get:
 *    tags:
 *    - Medicine category Routes
 *    summary: Get all medicine category (?page=1&limit=10&sort=1)
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
    medicineCategoryController.getAllMedicineCategories
);

/**
 * @openapi
 * '/api/v1/medicine-categories/{id}':
 *  get:
 *    tags:
 *    - Medicine category Routes
 *    summary: Get medicine category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: medicine category id
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
    medicineCategoryController.getMedicineCategoryById
);

module.exports = router;