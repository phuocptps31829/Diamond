const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/users':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get all users
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
    userController.getAllUsers
);

/**
 * @openapi
 * '/api/v1/users/get-by-role/{name}':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get all users
 *    parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        description: Role name
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
    '/get-by-role/:name',
    helperMiddleware.checkValueQuery,
    helperMiddleware.checkQueryParams,
    userController.getAllUsersByRole
);

/**
 * @openapi
 * '/api/v1/users/get-by-id/{id}':
 *  get:
 *    tags:
 *    - User Routes
 *    summary: Get user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
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
    '/get-by-id/:id',
    helperMiddleware.checkValidId,
    userController.getUserByID
);

module.exports = router;