const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const medicineController = require('../controllers/medicine.controller');
const cacheMiddleware = require('../middlewares/cache.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/medicines':
 *  get:
 *    tags:
 *    - Medicine Routes
 *    summary: Get all medicine (?page=1&limit=10&sort=1)
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
    authMiddleware.isHasPermission([process.env.ROLE_ADMIN, process.env.ROLE_SUPER_ADMIN, process.env.ROLE_DOCTOR]),
    cacheMiddleware.cache("Medicine:"),
    helperMiddleware.checkQueryParams,
    medicineController.getAllMedicines
);

/**
 * @openapi
 * '/api/v1/medicines/get-by-category/{id}':
 *  get:
 *    tags:
 *    - Medicine Routes
 *    summary: Get medicine by category id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: category id
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
    '/get-by-category/:id',
    helperMiddleware.checkValidId,
    medicineController.getMedicineByCategoryID
);

/**
 * @openapi
 * '/api/v1/medicines/{id}':
 *  get:
 *    tags:
 *    - Medicine Routes
 *    summary: Get medicine  by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: medicine  id
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
    medicineController.getMedicineById
);

module.exports = router;