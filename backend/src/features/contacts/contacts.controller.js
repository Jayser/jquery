const Contact = require('./contacts.model.js');

/**
 * Load contact and append to req.
 */
function load(req, res, next, id) {
  Contact.get(id)
    .then((contact) => {
      console.log(JSON.stringify(contact))
      console.log(JSON.stringify(contact))
      req.contact = contact; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get contact
 * @returns {Contact}
 */
function get(req, res) {
  return res.json(req.contact);
}

/**
 * Create new contact
 * @property {string} req.body.firstName - The first name of contact.
 * @property {string} req.body.lastName - The last name of contact.
 * @property {string} req.body.phoneNumber - The phone number of contact.
 * @returns {Contact}
 */
function create(req, res, next) {
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber
  });

  contact.save()
    .then(savedContact => res.json(savedContact))
    .catch(e => next(e));
}

/**
 * Update existing contact
 * @property {string} req.body.firstName - The first name of contact.
 * @property {string} req.body.lastName - The last name of contact.
 * @property {string} req.body.mobileNumber - The mobile number of contact.
 * @returns {Contact}
 */
function update(req, res, next) {
  const contact = req.contact;
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.phoneNumber = req.body.phoneNumber;

  contact.save()
    .then(savedContact => res.json(savedContact))
    .catch(e => next(e));
}

/**
 * Get contact list.
 * @property {number} req.query.skip - Number of contacts to be skipped.
 * @property {number} req.query.limit - Limit number of contacts to be returned.
 * @returns {Contact[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Contact.list({ limit, skip })
    .then(contacts => res.json(contacts))
    .catch(e => next(e));
}

/**
 * Delete contact.
 * @returns {Contact}
 */
function remove(req, res, next) {
  const contact = req.contact;
  contact.remove()
    .then(deletedContact => res.json(deletedContact))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
