import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';

import { FormField } from '../../../../shared/forms';
import validate from './validate';

@reduxForm({
  form: 'contacts/form/LAYOUT',
  validate
})
export default class extends Component {
  static propTypes = {
    ...propTypes,
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { title, handleSubmitForm, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='text-center'>
        <h1>{ title }</h1>
        <form onSubmit={ handleSubmit(handleSubmitForm) }>
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
            <button type='submit' disabled={ submitting }>submit</button>
            <button type='button' disabled={ pristine || submitting } onClick={ reset }>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
