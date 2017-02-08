import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { reduxForm, propTypes } from 'redux-form';

import { FormField } from '../../../../shared/forms';
import formValidation from '../formValidation';

@reduxForm({
  form: 'contacts/form/CREATE',
  validate: formValidation
})
export default class extends Component {
  static propTypes = {
    ...propTypes,
    actions: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    this.props.actions.clearCreate();
  }

  componentWillReceiveProps({ contacts: { form: { create: { loaded } } } }) {
    if (loaded) {
      this.props.router.push('/contacts');
    }
  }

  @autobind onSubmit(values) {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber
      };
      this.props.actions.createContact({ body });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='text-center'>
        <h1>Create Contact</h1>
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
            <button type='submit' disabled={ submitting }>Create Contact</button>
            <button type='button' disabled={ pristine || submitting } onClick={ reset }>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
