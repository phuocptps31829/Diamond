const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const branchController = require('../controllers/branch.controller');
const cacheMiddleware = require('../middlewares/cache.middleware');

/**
 * @openapi
 * '/api/v1/branches':
 *  get:
 *    tags:
 *    - Branch Routes
 *    summary: Get all branches
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
    cacheMiddleware.cache("Branch:"),
    helperMiddleware.checkQueryParams,
    branchController.getAllBranches
);

/**
 * @openapi
 * '/api/v1/branches/specialty/{id}':
 *  get:
 *    tags:
 *    - Branch Routes
 *    summary: Get branch by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Branch id
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
    branchController.getBranchBySpecialtyID
);

/**
 * @openapi
 * '/api/v1/branches/{id}':
 *  get:
 *    tags:
 *    - Branch Routes
 *    summary: Get branch by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Branch id
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
    branchController.getBranchByID
);

module.exports = router;