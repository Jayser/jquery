import React, { Component, PropTypes } from 'react';

import ContactsListRemoveButton from '../ContactsListRemoveButton';
import ContactsListEditButton from '../ContactsListEditButton';

export default class extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    handleRemoveContact: PropTypes.func.isRequired
  };

  render() {
    const { contacts, handleRemoveContact } = this.props;

    return (
      <tbody>
        {
          contacts.map((contact) => (
            <tr key={ contact._id }>
              <td>{ contact.firstName }</td>
              <td>{ contact.lastName }</td>
              <td>{ contact.phoneNumber }</td>
              <td className='text-center'>
                <ContactsListEditButton contactId={ contact._id } />
                <ContactsListRemoveButton handleRemoveContact={ handleRemoveContact } contactId={ contact._id } />
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }
}
