import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { reduxForm, propTypes } from 'redux-form';

import { FormField } from '../../../../shared/forms';
import formValidation from '../formValidation';

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

  componentWillReceiveProps({ contacts: { form: { update: { contact, readOneLoaded } } } }) {
    if(readOneLoaded) {
      this.contact = this.getContact(contact);
    }
  }

  @autobind onSubmit(values) {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber
    };
    const contactId = this.contactId;

    this.props.actions.updateContact({ contactId, body });
  }

  componentWillReceiveProps({ contacts: { form: { update: { contact, readOneLoaded, updateLoaded } } }, dirty }) {
    if(updateLoaded) {
      this.props.router.push('/contacts');
      return false;
    }

    if(readOneLoaded) {
      this.contact = this.getContact(contact);

      if (!dirty && this.contact._id) {
        this.props.change('firstName', this.contact.firstName);
        this.props.change('lastName', this.contact.lastName);
        this.props.change('phoneNumber', this.contact.phoneNumber);
      }
    }
  }

  componentWillUnmount() {
    this.props.actions.clearUpdate();
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
