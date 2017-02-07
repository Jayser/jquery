const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Contact Schema
 */
const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
ContactSchema.statics = {
  /**
   * Get contact
   * @param {ObjectId} id - The objectId of contact.
   * @returns {Promise<Contact, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((contact) => {
        if (contact) {
          return contact;
        }
        const err = new APIError('No such contact exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List contacts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of contacts to be skipped.
   * @param {number} limit - Limit number of contacts to be returned.
   * @returns {Promise<Contact[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Contact
 */
module.exports = mongoose.model('Contact', ContactSchema);
