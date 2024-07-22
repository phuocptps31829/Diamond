const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
// const uploadMiddleware = require('../middlewares/upload.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorValidator = require('../validations/doctor.validation');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/doctors':
 *  get:
 *    tags:
 *    - Doctor Routes
 *    summary: Get all doctor (?page=1&limit=10&sort=1)
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
    doctorController.getAllDoctors
);
module.exports = router;