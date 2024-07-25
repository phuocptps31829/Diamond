const { checkSchema } = require('express-validator');
const NewsModel = require('../models/news.model');


const newsValidator = checkSchema({
    specialtyID: {
        exists: {
            errorMessage: 'Specialty ID is required'
        },
        isMongoId: {
            errorMessage: 'Invalid specialty ID'
        }
    },
    title: {
        exists: {
            errorMessage: 'Title is required'
        },
        isString: {
            errorMessage: 'Title should be a string'
        },
        trim: true
    },
    content: {
        exists: {
            errorMessage: 'Content is required'
        },
        isString: {
            errorMessage: 'Content should be a string'
        },
        trim: true
    },
    author: {
        exists: {
            errorMessage: 'Author is required'
        },
        isString: {
            errorMessage: 'Author should be a string'
        },
        trim: true
    },
    viewCount: {
        exists: {
            errorMessage: 'View count is required'
        },
        isNumeric: {
            errorMessage: 'View count should be a number'
        }
    }

});



module.exports = {
    newsValidator,
};