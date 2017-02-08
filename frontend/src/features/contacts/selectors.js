// Selectors
const USERS_PER_PAGE = 5;

export function selectorContacts({ contacts: { form, list, readOne }, routing }) {
  const { locationBeforeTransitions: { query: { contactId, page } } } = routing;
  const { update, create } = form;
  const { activePage, data } = list.read;
  const newActivePage = Number(page || activePage);
  const from = (newActivePage - 1) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE;
  const contact = data.find((contact) => (contact._id === contactId)) || {};

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
      activePage: newActivePage,
      count: data.length,
      data: data.slice(from, to)
    }
  }
}
