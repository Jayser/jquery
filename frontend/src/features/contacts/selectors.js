const USERS_PER_PAGE = 5;

function getContactsPerPage(data, activePage) {
  const from = (activePage - 1) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE;

  return data.slice(from, to);
}

function getContact(data, contactId) {
  return data.find((contact) => (contact._id === contactId)) || {};
}

function getActivePage({ activePage }, { page }) {
  return Number(page || activePage)
}

export function selectorContacts({ contacts: { form, list: { read }, readOne }, routing }) {
  const { locationBeforeTransitions: { query } } = routing;
  const { update, create } = form;

  const data = read.data;
  const contactId = query.contactId;
  const activePage = getActivePage(read, query);
  const contact = getContact(data, contactId);

  return {
    history: { contact, contactId, loaded: readOne.loaded },
    form: {
      create,
      update: {
        contact,
        data,
        readOneLoaded: readOne.loaded,
        updateLoaded: update.loaded,
        contactId
      }
    },
    list: {
      activePage,
      count: data.length,
      data: getContactsPerPage(data, activePage)
    }
  }
}
