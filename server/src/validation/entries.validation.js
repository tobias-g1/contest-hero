const Joi = require('joi');

module.exports = {

    create_entry: {
        body: {
            access_token: Joi.string().required(),
            title: Joi.string().required(),
            author: Joi.string().required(),
            permlink: Joi.string().required(),
            body: Joi.string().required(),
            parent_contest: {
                permlink: Joi.string().required(),
                author: Joi.string().required(),
                id: Joi.string().required()
            }
        }
    }
};