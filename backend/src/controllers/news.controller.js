const NewsModel = require('../models/news.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllNews: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await NewsModel.countDocuments({ isDeleted: false });

            const news = await NewsModel
                .find({ isDeleted: false })
                .skip(skip)
                .limit(limitDocuments)
                .sort(sortOptions);

            if (!news.length) {
                createError(404, 'No news found.');
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Categories retrieved successfully.',
                data: news,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getNewsById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const news = await NewsModel.findById(id);

            if (!news) {
                createError(404, 'News not found.');
            }

            return res.status(200).json({
                message: 'News retrieved successfully.',
                data: news
            });
        } catch (error) {
            next(error);
        }
    },
    getNewsBySlug: async (req, res, next) => {
        try {
            const { slug } = req.params;

            const news = await NewsModel.findOne({
                slug: slug,
                isDeleted: false
            });

            if (!news) {
                createError(404, 'News not found.');
            }

            return res.status(200).json({
                message: 'News retrieved successfully.',
                data: news
            });
        } catch (error) {
            next(error);
        }
    }
};