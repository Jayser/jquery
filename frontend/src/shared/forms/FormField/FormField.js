import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import Input from './Input';

const componentsMap = {
  input: Input
};

export default class extends Component {
  static propTypes = {
    component: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  render() {
    const { name, component, type, label, placeholder } = this.props;

    const fieldProps = {
      name,
      type,
      label,
      placeholder,
      component: componentsMap[component]
    };

    return (
      <Field { ...fieldProps } />
    );
  }
}
