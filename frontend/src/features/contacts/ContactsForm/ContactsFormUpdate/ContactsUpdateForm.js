import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import ContactsFormLayout from '../ContactsFormLayout';

export default class extends Component {
  static propTypes = {
    actions: PropTypes.object,
    contacts: PropTypes.object,
    router: PropTypes.object
  };

  componentWillMount(){
    const { contacts: { form: { update: { contact, contactId } } } } = this.props;
    this.contactId = contactId;
    this.contact = this.getContact(contact, contactId);
  }

  getContact(contact, contactId) {
    if(!contact._id) {
      this.props.actions.readContact({ contactId });
    }
    return contact;
  }

  @autobind handleSubmit(values) {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber
    };

    this.props.actions.updateContact({ contactId: this.contactId, body });
  }

  componentWillReceiveProps({ contacts: { form: { update: { contact, updateLoaded } } } }) {
    this.contact = contact || this.contact;

    if(updateLoaded) {
      this.props.router.push('/contacts');
    }
  }

  componentWillUnmount() {
    this.props.actions.clearUpdate();
  }

  render() {
    const { firstName, lastName, phoneNumber } = this.contact;

    if (!firstName) {
      return null;
    }

    return <ContactsFormLayout
      title='Create contact'
      initialValues={ { firstName, lastName, phoneNumber } }
      handleSubmitForm={ this.handleSubmit } />;
  }
}
