const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const revenueController = require('../controllers/revenue.controller');

/**
 * @openapi
 * '/api/v1/revenue':
 *  get:
 *    tags:
 *    - Revenue Route
 *    summary: Get revenue by type
 *    parameters:
 *      - in: query
 *        name: type
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
    revenueController.getRevenue
);

module.exports = router;