const NewsModel = require('../models/news.model');
const { createError } = require('../utils/helper.util');
const { validationError } = require('../utils/validation.util');

const getAllNews = async (req, res, next) => {
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

        const resNews = news.map(item => {
            const { __v, isDeleted, ...data } = item._doc;
            return data;
        });

        return res.status(200).json({
            page: page || 1,
            message: 'Categories retrieved successfully.',
            data: resNews,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getNewsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const news = await NewsModel.findById(id);

        if (!news) {
            createError(404, 'News not found.');
        }

        const { __v, isDeleted, ...data } = news._doc;

        return res.status(200).json({
            message: 'News retrieved successfully.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const createNews = async (req, res, next) => {
    try {
        validationError(req, res);

        const newNews = await NewsModel.create(req.body);

        const { __v, isDeleted, ...resNews } = newNews._doc;

        return res.status(201).json({
            message: 'News created successfully.',
            data: resNews
        });
    } catch (error) {
        next(error);
    }
};

const updateNews = async (req, res, next) => {
    try {
        validationError(req, res);

        const { id } = req.params;

        const updatedNews = await NewsModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );

        if (!updatedNews) {
            createError(404, 'News not found.');
        }

        const { __v, isDeleted, ...resNews } = updatedNews._doc;

        return res.status(200).json({
            message: 'News updated successfully.',
            data: resNews
        });
    } catch (error) {
        next(error);
    }
};

const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedNews = await NewsModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedNews) {
            createError(404, 'News not found.');
        }

        const { __v, isDeleted, ...resNews } = deletedNews._doc;

        return res.status(200).json({
            message: 'News deleted successfully.',
            data: resNews
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};