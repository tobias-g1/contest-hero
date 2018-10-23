const Joi = require('joi');

module.exports = {

  create_contest: {
    body: {
        access_token: Joi.string().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        deadline: Joi.string().required(),
        category: Joi.string().required(),
        permlink: Joi.string().required(),
        entry_method: Joi.string().required(),
        body: Joi.string().required()
    }
  },
  edit_contest: {
    body: {
        access_token: Joi.string().required(),
        id: Joi.string().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        deadline: Joi.string().required(),
        category: Joi.string().required(),
        entry_method: Joi.string().required(),
        body: Joi.string().required()
    }
  },
  set_winners: {
    body: {
        access_token: Joi.string().required(),
        author: Joi.string().required(),
        id: Joi.string().required(),
        winners: Joi.array().required()
    }
  }
};