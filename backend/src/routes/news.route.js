const express = require('express');

const helperMiddleware = require('../middlewares/helper.middleware');
const newsController = require('../controllers/news.controller');

const router = express.Router();

/**
 * @openapi
 * '/api/v1/news':
 *  get:
 *    tags:
 *    - News Routes
 *    summary: Get all news (?page=1&limit=10&sort=1)
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
    newsController.getAllNews
);


/**
 * @openapi
 * '/api/v1/news/slug/{slug}':
 *  get:
 *    tags:
 *    - News Routes
 *    summary: Get news by slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *        description: News slug
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
    newsController.getNewsBySlug
);

/**
 * @openapi
 * '/api/v1/news/{id}':
 *  get:
 *    tags:
 *    - News Routes
 *    summary: Get news by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: News id
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
    newsController.getNewsById
);

module.exports = router;