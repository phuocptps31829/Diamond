const express = require('express');

const router = express.Router();

const helperMiddleware = require('../middlewares/helper.middleware');
const appointmentController = require('../controllers/appointment.controller');
const appointmentValidator = require('../validations/appointment.validation');

/** 
* @openapi
 * '/api/v1/appointments/add':
 *  post:
 *    tags:
 *    - Appointment Routes
 *    summary: Add new appointment
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
 *              paymentMethod:
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
    '/add',
    branchValidator.branchValidator,
    branchController.createBranch
);

module.exports = router;