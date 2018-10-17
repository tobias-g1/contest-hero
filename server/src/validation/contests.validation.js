const Joi = require('joi');

module.exports = {

  create_contest: {
    body: {
        access_token: Joi.string().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        id: Joi.string().required(),
        deadline: Joi.string().required(),
        category: Joi.string().required(),
        permlink: Joi.string().required(),
        body: Joi.string().required()
    }
  },
  set_winners: {
    body: {
        winners: Joi.array().required()
    }
  }
};