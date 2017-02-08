const mongoose = require('mongoose');

/**
 * Call Schema
 */
const CallSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  }
});

/**
 * @typedef Call
 */
module.exports = mongoose.model('Call', CallSchema);
