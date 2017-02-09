import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import ContactsFormLayout from '../ContactsFormLayout';

export default class extends Component {
  static propTypes = {
    actions: PropTypes.object,
    contacts: PropTypes.object,
    router: PropTypes.object
  };

  componentWillReceiveProps({ contacts: { form: { create: { loaded } } } }) {
    if (loaded) {
      this.props.router.push('/contacts');
    }
  }

  @autobind handleSubmit(values) {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber
      };
      this.props.actions.createContact({ body });
  }

  componentWillUnmount() {
    this.props.actions.clearCreate();
  }

  render() {
    return <ContactsFormLayout title='Create contact' handleSubmitForm={ this.handleSubmit } />;
  }
}
