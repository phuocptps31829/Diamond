const { checkSchema } = require('express-validator');
const NewModel = require('../models/new.model');


const newPostValidator = checkSchema({
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
            errorMessage: 'ViewCount is required'
        },
        isNumeric: {
            errorMessage: 'ViewCount should be a number'
        }
    }

});

const newUpdateValidator = checkSchema({
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
            errorMessage: 'ViewCount is required'
        },
        isNumeric: {
            errorMessage: 'ViewCount should be a number'
        }
    }
});

module.exports = {
    newPostValidator,
    newUpdateValidator
};