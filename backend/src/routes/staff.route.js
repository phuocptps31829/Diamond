const express = require('express');

const router = express.Router();

const staffController = require('../controllers/staff.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/staffs':
 *  get:
 *    tags:
 *    - Staff Routes
 *    summary: Get all staffs
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
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    staffController.getAllStaffs
);

/**
 * @openapi
 * '/api/v1/staffs/get-by-role-name/{roleName}':
 *  get:
 *    tags:
 *    - Staff Routes
 *    summary: Get staff by role name
 *    parameters:
 *      - in: path
 *        name: roleName
 *        required: true
 *        description: Staff role name
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
    '/get-by-role-name/:roleName',
    staffController.getStaffsByRole
);

/**
 * @openapi
 * '/api/v1/staff/{id}':
 *  get:
 *    tags:
 *    - Staff Routes
 *    summary: Get staff by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Staff id
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
    staffController.getStaffByID
);

module.exports = router;