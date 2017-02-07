const Joi = require('joi');

module.exports = {
  // POST /api/contacts
  createContact: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateContact: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required()
    },
    params: {
      contactId: Joi.string().hex().required()
    }
  }
};
