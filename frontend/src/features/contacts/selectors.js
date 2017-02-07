// Selectors
const USERS_PER_PAGE = 5;

export function selectorContacts({ contacts, routing: { locationBeforeTransitions: { query } } } ) {
  const activePage = Number(query.page || contacts.read.activePage);
  const from = (activePage - 1) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE;

  return {
    ...contacts,
    read: {
      activePage,
      count: contacts.read.data.length,
      data: contacts.read.data.slice(from, to)
    }
  }
}
