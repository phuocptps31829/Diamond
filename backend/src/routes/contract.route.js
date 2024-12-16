const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const contractController = require('../controllers/contract.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');

/**
 * @openapi
 * '/api/v1/contracts':
 *  get:
 *    tags:
 *    - Contract Routes
 *    summary: Get all contracts
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
    authMiddleware.isHasPermission([process.env.ROLE_ADMIN, process.env.ROLE_SUPER_ADMIN]),
    cacheMiddleware.cache("Contract:"),
    helperMiddleware.checkQueryParams,
    contractController.getAllContracts
);

/**
 * @openapi
 * '/api/v1/contracts/{id}':
 *  get:
 *    tags:
 *    - Contract Routes
 *    summary: Get contract by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Contract id
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
    contractController.getContractByID
);

module.exports = router;