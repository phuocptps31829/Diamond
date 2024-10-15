const express = require('express');

const router = express.Router();

const medicalPackageController = require('../controllers/medical-package.controller');
const helperMiddleware = require('../middlewares/helper.middleware');

/**
 * @openapi
 * '/api/v1/medical-packages':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get all medical package
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
 *      - in: query
 *        name: branchID
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        style: form
 *        explode: true
 *      - in: query
 *        name: specialtyID
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
    helperMiddleware.checkQueryParams,
    helperMiddleware.checkValueQuery,
    medicalPackageController.getAllMedicalPackages
);

/**
 * @openapi
 * '/api/v1/medical-packages/slug/{slug}':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get medical package by slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *        description: Medical package slug
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
    '/slug/:slug',
    medicalPackageController.getMedicalPackageBySlug
);

/**
 * @openapi
 * '/api/v1/medical-packages/{id}':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get medical package by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Medical package id
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
    medicalPackageController.getMedicalPackageById
);

/**
 * @openapi
 * '/api/v1/medical-packages/specialty/{id}':
 *  get:
 *    tags:
 *    - Medical Package Routes
 *    summary: Get medical package by specialty id
*    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Specialty package id
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
    '/specialty/:id',
    helperMiddleware.checkQueryParams,
    helperMiddleware.checkValidId,
    medicalPackageController.getAllMedicalPackagesBySpecialtyId
);

module.exports = router;