const Joi = require('joi');

const getExperts = {
    query: Joi.object().keys({
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().min(1),
        category: Joi.string(),
        search: Joi.string(),
    }),
};

const getExpert = {
    params: Joi.object().keys({
        id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
    }),
};

module.exports = { getExperts, getExpert };
