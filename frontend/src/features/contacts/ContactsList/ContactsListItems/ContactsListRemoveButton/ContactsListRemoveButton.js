import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class extends Component {
  static propTypes = {
    contactId: PropTypes.string.isRequired,
    handleRemoveContact: PropTypes.func.isRequired
  };

  render() {
    const { contactId, handleRemoveContact } = this.props;
    return (
      <Button bsStyle='danger' onClick={ () => handleRemoveContact(contactId) }>
        delete
      </Button>
    );
  }
}
