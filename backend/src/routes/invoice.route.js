const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const appointmentValidator = require('../validations/appointment.validation');
const invoiceController = require('../controllers/invoice.controller');

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

router.post(
    '/payment/zalopay',
    invoiceController.zaloPayPayment
);

router.post(
    '/payment/zalopay/callback',
    invoiceController.zaloPayCallback
);

/** 
* @openapi
 * '/api/v1/invoices/payment/momo':
 *  post:
 *    tags:
 *    - Appointment Routes
 *    summary: Add new appointment momo method
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - patientID
 *              - doctorID
 *              - clinicID
 *              - type
 *              - time
 *              - status
 *              - paymentMethod
 *            properties:
 *              patientID:
 *                type: string
 *              doctorID:
 *                type: string
 *              serviceID:
 *                type: string
 *              medicalPackageID:
 *                type: string
 *              clinicID:
 *                type: string
 *              type:
 *                type: string
 *              time:
 *                type: string
 *              status:
 *                type: string
 *              isHelp:
 *                type: string
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/payment/momo',
    appointmentValidator.appointmentValidator,
    invoiceController.momoPayment
);

router.post(
    '/payment/momo/callback',
    invoiceController.momoPaymentCallback
);


/** 
* @openapi
 * '/api/v1/invoices/payment/vnpay':
 *  post:
 *    tags:
 *    - Appointment Routes
 *    summary: Add new appointment VNPAY method
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - patientID
 *              - doctorID
 *              - clinicID
 *              - type
 *              - time
 *              - status
 *              - paymentMethod
 *            properties:
 *              patientID:
 *                type: string
 *              doctorID:
 *                type: string
 *              serviceID:
 *                type: string
 *              medicalPackageID:
 *                type: string
 *              clinicID:
 *                type: string
 *              type:
 *                type: string
 *              time:
 *                type: string
 *              status:
 *                type: string
 *              isHelp:
 *                type: string
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '409':
 *        $ref: '#/components/responses/409'
 *      '500':
 *        $ref: '#/components/responses/500'
 */
router.post(
    '/payment/vnpay',
    // appointmentValidator.appointmentValidator,
    invoiceController.vnpayPayment
);

router.get(
    '/payment/vnpay_ipn',
    invoiceController.vnpayIPN
);

router.get(
    '/payment/vnpay_return',
    invoiceController.vnpayReturn
);

module.exports = router;