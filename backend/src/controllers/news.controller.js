const NewsModel = require('../models/news.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getAllNews: async (req, res, next) => {
        try {
            const notHidden = req.query.notHidden === 'true';
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;

            const totalRecords = await NewsModel.countDocuments({
                isDeleted: false,
                ...(notHidden ? { isHidden: false } : {}),
            });

            const news = await NewsModel
                .find({
                    isDeleted: false,
                    ...(notHidden ? { isHidden: false } : {}),
                })
                .skip(skip)
                .limit(limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                })
                .populate("specialtyID")
                .lean();

            if (!news.length) {
                createError(404, 'No news found.');
            }

            const formattedNews = news.map((news) => {
                const newNews = { ...news };
                newNews.specialty = {
                    _id: newNews.specialtyID._id,
                    name: newNews.specialtyID.name,
                };
                delete newNews.specialtyID;
                return newNews;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'News retrieved successfully.',
                data: formattedNews,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getNewsById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const news = await NewsModel
                .findOne({
                    _id: id,
                    isDeleted: false
                })
                .populate("specialtyID")
                .lean();

            if (!news) {
                createError(404, 'News not found.');
            }

            const formattedNews = {
                ...news,
                specialty: {
                    _id: news.specialtyID._id,
                    name: news.specialtyID.name,
                }
            };
            delete formattedNews.specialtyID;

            return res.status(200).json({
                message: 'News retrieved successfully.',
                data: formattedNews
            });
        } catch (error) {
            next(error);
        }
    },
    getNewsBySlug: async (req, res, next) => {
        try {
            const { slug } = req.params;

            const news = await NewsModel
                .findOne({
                    slug: slug,
                    isDeleted: false
                })
                .populate("specialtyID")
                .lean();

            if (!news) {
                createError(404, 'News not found.');
            }

            const formattedNews = {
                ...news,
                specialty: {
                    _id: news.specialtyID._id,
                    name: news.specialtyID.name,
                }
            };
            delete formattedNews.specialtyID;

            return res.status(200).json({
                message: 'News retrieved successfully.',
                data: formattedNews
            });
        } catch (error) {
            next(error);
        }
    }
};