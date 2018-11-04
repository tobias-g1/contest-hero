const Joi = require('joi');

module.exports = {

  create_contest: {
    body: {
        access_token: Joi.string().min(6).max(512).required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        deadline: Joi.string().required(),
        category: Joi.string().required(),
        permlink: Joi.string().required(),
        entry_method: Joi.string().required(),
        body: Joi.string().required(),
        prize: {
          type: Joi.string().required(),
          value: Joi.string().required()
        }
    }
  },
  edit_contest: {
    body: {
        access_token: Joi.string().min(6).max(512).required(),
        id: Joi.string().min(24).max(24).required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        deadline: Joi.string().required(),
        category: Joi.string().required(),
        entry_method: Joi.string().required(),
        body: Joi.string().required(),
        prize: {
          type: Joi.string().required(),
          value: Joi.string().required()
        }
    }
  },
  set_winners: {
    body: {
        access_token: Joi.string().min(6).max(512).required(),
        author: Joi.string().required(),
        id: Joi.string().min(24).max(24).required(),
        winners: Joi.array().required()
    }
  }
};