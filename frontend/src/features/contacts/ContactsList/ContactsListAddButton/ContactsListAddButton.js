import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';

import styles from './ContactsListAddButton.scss';

@CSSModules(styles)
export default class extends Component {
  render() {
    return (
      <section styleName='root'>
        <LinkContainer to={ { pathname: '/contacts/create-contact' } }>
          <Button bsStyle='success'>Add contact</Button>
        </LinkContainer>
      </section>
    );
  }
}
