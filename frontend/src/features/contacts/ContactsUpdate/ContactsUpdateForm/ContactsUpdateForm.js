import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { reduxForm, propTypes } from 'redux-form';

import { FormField } from '../../../../shared/forms';
import formValidation from '../../utils/formValidation';

@reduxForm({
  form: 'contacts/form/UPDATE',
  validate: formValidation
})
export default class extends Component {
  static propTypes = {
    ...propTypes,
    actions: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

  componentWillMount(){
    this.contactId = this.props.router.getCurrentLocation().query.contactId;
  }

  @autobind onSubmit(values) {
      this.props.actions.updateContact(this.contactId, {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber
      });
  }

  componentWillReceiveProps({ contacts: { read: { data }, update: { loaded } }, actions: { readContact }, dirty }) {
    const editContact = data.find((contact) => (contact._id === this.contactId));

    if (!editContact) {
      readContact(this.contactId);
      return;
    }

    if (!dirty && editContact._id) {
      this.props.change('firstName', editContact.firstName);
      this.props.change('lastName', editContact.lastName);
      this.props.change('phoneNumber', editContact.phoneNumber);
    }

    if(loaded) {
      this.props.router.push('/contacts');
    }
  }

  componentWillUnmount() {
    this.props.actions.clearState();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='text-center'>
        <h1>Edit Contact</h1>
        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <FormField
            name='firstName'
            type='text'
            component='input'
            label='First Name *'
            placeholder='input first name' />
          <FormField
            name='lastName'
            type='text'
            component='input'
            label='Last Name *'
            placeholder='input last name' />
          <FormField
            name='phoneNumber'
            type='text'
            component='input'
            label='Phone Number *'
            placeholder='input phone number' />
          <div>
            <button type='submit' disabled={ submitting }>Edit Contact</button>
            <button type='button' disabled={ pristine || submitting } onClick={ reset }>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
