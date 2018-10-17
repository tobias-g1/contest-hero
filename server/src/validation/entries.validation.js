const Joi = require('joi');

module.exports = {

    create_entry: {
        body: {
            title: Joi.array().required(),
            author: Joi.array().required(),
            permlink: Joi.array().required(),
            body: Joi.array().required(),
            parent_contest: {
                id: Joi.array().required(),
                permlink: Joi.array().required(),
                category: Joi.array().required(),
                author: Joi.array().required()
            }
        }
    }
};