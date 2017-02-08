import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class extends Component {
  static propTypes = {
    contactId: PropTypes.string.isRequired,
  };
  render() {
    const { contactId } = this.props;

    return (
      <LinkContainer to={ { pathname: `/contacts/update-contact`, query: { contactId } } }>
        <Button bsStyle='primary'>edit</Button>
      </LinkContainer>
    );
  }
}
