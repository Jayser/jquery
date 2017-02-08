import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';

import ContactsListTh from '../ContactsListTh';
import ContactsListItems from '../ContactsListItems';
import ContactsListPagination from '../ContactsListPagination';
import ContactsListAddButton from '../ContactsListAddButton';
import styles from './ContactsView.scss';

@CSSModules(styles)
export default class extends Component {
  static propTypes = {
    contacts: PropTypes.object,
    actions: PropTypes.object,
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.actions.readContacts();
  }

  @autobind handleChangeRoute({ page }) {
    this.props.router.push(`/contacts/?page=${ page }`);
  }

  render() {
    const { contacts: { list: { data, activePage, count } }, actions: { removeContact } } = this.props;

    return (
      <section styleName='root'>
        <h1>Contacts List</h1>
        <ContactsListAddButton />
        <div>
          <Table styleName='table' striped bordered condensed hover>
            <thead>
              <ContactsListTh />
            </thead>
            <ContactsListItems contacts={ data } handleRemoveContact={ removeContact } />
          </Table>
          <ContactsListPagination
            activePage={ activePage }
            items={ count }
            onSelect={ this.handleChangeRoute } />
        </div>
      </section>
    );
  }
}
