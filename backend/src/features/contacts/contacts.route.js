const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./contacts.validation');
const contactCtrl = require('./contacts.controller.js');

const router = express.Router();

router.route('/')
  /** GET /api/contacts - Get list of contacts */
  .get(contactCtrl.list)

  /** POST /api/contacts - Create new contact */
  .post(validate(paramValidation.createContact), contactCtrl.create);

router.route('/:contactId')
  /** GET /api/contacts/:contactId - Get contact */
  .get(contactCtrl.get)

  /** PUT /api/contacts/:contactId - Update contact */
  .put(validate(paramValidation.updateContact), contactCtrl.update)

  /** DELETE /api/contacts/:contactId - Delete contact */
  .delete(contactCtrl.remove);

/** Load contact when API with contactId route parameter is hit */
router.param('contactId', contactCtrl.load);

module.exports = router;
