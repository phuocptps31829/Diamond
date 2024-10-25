const express = require('express');

const router = express.Router();

const roleController = require('../controllers/role.controller');
const helperMiddleware = require('../middlewares/helper.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @openapi
 * '/api/v1/roles':
 *  get:
 *    tags:
 *    - Role Routes
 *    summary: Get all roles
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
 *        name: rolesID
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
    authMiddleware.verifySuperAdmin,
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    roleController.getAllRoles
);

/**
 * @openapi
 * '/api/v1/roles/{id}':
 *  get:
 *    tags:
 *    - Role Routes
 *    summary: Get role by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Role id
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
    roleController.getRoleById
);

module.exports = router;