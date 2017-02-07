const express = require('express');
const contactsRoutes = require('./features/contacts/contacts.route.js');

const router = express.Router();

// mount user routes at /contacts
router.use('/contacts', contactsRoutes);

module.exports = router;
