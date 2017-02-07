import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object
  };

  render() {
    const { input, label, placeholder, type, meta: { touched, error } } = this.props;

    return (
      <div>
        { label ? <label>{ label }</label> : null }
        <div>
          <input { ...input } placeholder={ placeholder } type={ type } />
          { touched && error && <span>{ error }</span>}
        </div>
      </div>
    );
  }
}
