const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const invoiceController = require('../controllers/invoice.controller');
const cacheMiddleware = require('../middlewares/cache.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @openapi
 * '/api/v1/invoices':
 *  get:
 *    tags:
 *    - Invoice Route
 *    summary: Get all invoices
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
    authMiddleware.isHasPermission([process.env.ROLE_STAFF_ACCOUNTANT, process.env.ROLE_SUPER_ADMIN]),
    cacheMiddleware.cache("Invoice:"),
    helperMiddleware.checkQueryParams,
    invoiceController.getAllInvoices
);

/**
 * @openapi
 * '/api/v1/invoices/{id}':
 *  get:
 *    tags:
 *    - Invoice Route
 *    summary: Get invoice by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Invoice id
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
    invoiceController.getInvoiceByID
);

module.exports = router;